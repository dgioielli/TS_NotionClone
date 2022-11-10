import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient({
    log: ["query"],
});


export function setPageController(fstf : FastifyInstance){
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
        })
        console.log("Foi");
        return reply.status(201).send({});
    });

    fstf.get("/test", async () => {
        //const result = await prisma.page.findMany();
        return { test : true };
    });
}