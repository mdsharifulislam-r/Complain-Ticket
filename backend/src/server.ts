import express,{Request,Response} from 'express'
import * as dotenv from 'dotenv'
import CookieParser from "cookie-parser"
import userRouter from "./routes/auth.routes"
import ticketRouter from './routes/ticket.routes'
import replyRouter from './routes/reply.routes'
import cors from "cors"
dotenv.config()
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(CookieParser())
app.use(cors(
  {
    origin:"http://localhost:3000",
    credentials: true,
  }
))
// Sample Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.use("/api",userRouter)
app.use("/api",ticketRouter)
app.use("/api",replyRouter)
// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
