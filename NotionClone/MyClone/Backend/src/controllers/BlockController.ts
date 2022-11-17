import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export function setBlockController(fstf : FastifyInstance, prisma : PrismaClient){
    console.log("Contrller: Page");
    fstf.get("/block/:blockId", async (request, reply) => {
        const createPoolParams = z.object({
            blockId : z.string(),
        });
        const { blockId } = createPoolParams.parse(request.params);
        const result = await prisma.block.findFirst({
            where : {
                id : blockId,
            }
        });
        return { page : result };
    });

    fstf.put("/block/:blockId", async (request, reply) => {
        const createPoolParams = z.object({
            blockId : z.string(),
        });
        const createPoolBody = z.object({
            html : z.string(),
            pageId : z.string(),
            type : z.string(),
        });
        const { blockId } = createPoolParams.parse(request.params);
        const { html, pageId, type } = createPoolBody.parse(request.body);
        await prisma.block.update({
            where : {
                id : blockId
            },
            data : {
                html,
                pageId,
                type,
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