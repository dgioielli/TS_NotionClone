import fastify from "fastify";
import cors from "@fastify/cors";
import { setPageController } from "./controllers/pageController";


export async function bootstrap(){
    console.log("Started!");
    const fstf = fastify({ logger: true });
    await fstf.register(cors, {origin: true});

    setPageController(fstf);

    fstf.listen({ 
        port: 3333,
        host: "0.0.0.0",
    });
}

bootstrap();