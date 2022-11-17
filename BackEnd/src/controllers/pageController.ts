import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export function setPageController(fstf : FastifyInstance, prisma : PrismaClient){
    console.log("Contrller: Page");
    fstf.get("/page/:pageId", async (request, reply) => {
        const createPoolParams = z.object({
            pageId : z.string(),
        });
        const { pageId } = createPoolParams.parse(request.params);
        const result = await prisma.page.findFirst({
            where : {
                id : pageId,
            }
        });
        return { page : result };
    });

    fstf.put("/page/:pageId", async (request, reply) => {
        const createPoolParams = z.object({
            pageId : z.string(),
        });
        const createPoolBody = z.object({
            name : z.string(),
        });
        const { pageId } = createPoolParams.parse(request.params);
        const { name } = createPoolBody.parse(request.body);
        await prisma.page.update({
            where : {
                id : pageId
            },
            data : {
                name,
            }
        });
        return reply.status(201).send({});
    });

    // fstf.delete("/pages", async (request, reply) => {
    //     const createPoolBody = z.object({
    //         id : z.string(),
    //     });
    //     const { id } = createPoolBody.parse(request.body);
    //     await prisma.page.delete({
    //         where : {
    //             id,
    //         },
    //     });
    //     return reply.status(204).send({});
    // });

    // fstf.get("/test", async () => {
    //     //const result = await prisma.page.findMany();
    //     return { test : true };
    // });
}