import { Request, Response } from "express";
import { getUserDetails, registerUserService } from "../services/auth.service";
import { body, validationResult } from "express-validator";
import prisma from "../prisma";
import { UserType } from "../types/types";
import * as bycypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function registerUser(req: Request, res: Response): Promise<any> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((item) => item.msg) });
    }

    const data: UserType = req.body;
    delete data.confirm_password;
    const exist = await prisma.user.findFirst({ where: { email: data.email } });

    if (exist?.name) {
      return res.status(400).json({ massage: "Account is already exists" });
    }
    data.password = await bycypt.hash(data.password, 10);
    const user = await registerUserService(data);

    return res.status(200).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function loginUser(req: Request, res: Response): Promise<any> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((item) => item.msg) });
    }
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bycypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(user?.id.toString(), process.env.JWT_SECRET!);
    res.cookie("token", token);

    return res.json({
      message: "Logged in successfully",
      data: {
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function logoutUser(req: Request, res: Response): Promise<any> {
    try {
        res.clearCookie("token");
        return res.json({ status:true,message: "Logged out successfully" });
    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
   
  
}

export async function getUser(req:Request,res:Response):Promise<any> {
  try {
    const { id } = req.params;
    const token = req.cookies['token']
    const user_id = jwt.decode(token)
    const main_id:any = id?id:user_id
    const user =await getUserDetails(parseInt(main_id))
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
