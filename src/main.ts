import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as cors from "cors"
import * as dotenv from 'dotenv';

async function bootstrap() {
  var whitelist = [process.env.URL_FRONT];
  const app = await NestFactory.create(AppModule,{cors:{
    origin:whitelist,
    credentials: true,
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization, X-Custom-Information',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
     //   optionsSuccessStatus: 200,
  //   preflightContinue: false,
  }});
  
  // await app.enableCors();
  
  await app.listen(process.env.PORT);
}

bootstrap();
