import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export function setPagesController(fstf : FastifyInstance, prisma : PrismaClient){
    console.log("Contrller: Pages");
    fstf.get("/pages", async () => {
        const result = await prisma.page.findMany();
        return { pages : result };
    });

    fstf.post("/pages", async (request, reply) => {
        const createPoolBody = z.object({
            name : z.string(),
        });
        console.log(request.body);
        const { name } = createPoolBody.parse(request.body);
        console.log(name);
        await prisma.page.create({
            data : {
                name,
            }
        });
        console.log("Foi");
        return reply.status(201).send({});
    });

    fstf.delete("/pages", async (request, reply) => {
        const createPoolBody = z.object({
            id : z.string(),
        });
        const { id } = createPoolBody.parse(request.body);
        await prisma.page.delete({
            where : {
                id,
            },
        });
        return reply.status(204).send({});
    });

    fstf.get("/test", async () => {
        //const result = await prisma.page.findMany();
        return { test : true };
    });
}