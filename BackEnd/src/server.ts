import fastify from "fastify";
import cors from "@fastify/cors";
import { setPagesController } from "./controllers/pagesController";
import { setPageController } from "./controllers/pageController";
import { PrismaClient } from "@prisma/client";
import { setBlocksController } from "./controllers/BlocksControllers";
import { setBlockController } from "./controllers/BlockController";

const prisma = new PrismaClient({
    log: ["query"],
});

export async function bootstrap(){
    console.log("Started!");
    const fstf = fastify({ logger: true });
    await fstf.register(cors, {origin: true});

    setPagesController(fstf, prisma);
    setPageController(fstf, prisma);
    setBlocksController(fstf, prisma);
    setBlockController(fstf, prisma);

    fstf.listen({ 
        port: 3333,
        host: "0.0.0.0",
    });
}

bootstrap();