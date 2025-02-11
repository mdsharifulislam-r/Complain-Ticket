import prisma from "../prisma";

export async function createCommentService(data:any) {
    try {
        await prisma.comment.create({
            data: data
        })

        return "Reply posted successfully";

    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }
}

export async function getCommentService(ticket_id:number) {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                ticket_id
            }
        })

        return comments;

    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }
}

export async function deleteCommentService(ticket_id:number) {
    try {
        await prisma.comment.deleteMany({
            where: {
                ticket_id
            }
        })

        return "Comments deleted successfully";

    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }
}
