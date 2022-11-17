import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export function setBlocksController(fstf : FastifyInstance, prisma : PrismaClient){
    console.log("Contrller: blocks");
    fstf.get("/blocks/:pageId", async (request, reply) => {
        const createPoolParams = z.object({
            pageId : z.string(),
        });
        const { pageId } = createPoolParams.parse(request.params);
        const result = await prisma.block.findMany({
            where : {
                pageId,
            }
        });
        return { blocks : result };
    });

    fstf.post("/blocks", async (request, reply) => {
        const createPoolBody = z.object({
            type : z.string(),
            html : z.string(),
            pageId : z.string(),
        });
        console.log(request.body);
        const { type, html, pageId } = createPoolBody.parse(request.body);
        console.log(type);
        console.log(html);
        console.log(pageId);
        const block = await prisma.block.create({
            data : {
                type,
                html,
                pageId,
            }
        });
        return reply.status(201).send({ id : block.id });
    });
    
    fstf.delete("/blocks", async (request, reply) => {
        console.log("   ----  TESTE DELETE  ----");
        const createPoolBody = z.object({
            id : z.string(),
        });
        console.log(request.body);
        const { id } = createPoolBody.parse(request.body);
        await prisma.block.delete({
            where : {
                id,
            },
        });
        console.log("   ----  Foi  ----");
        return reply.status(204).send({});
    });
}