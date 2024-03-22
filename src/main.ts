import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as cors from "cors"
import * as dotenv from 'dotenv';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { UserInputError } from 'apollo-server-errors';

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
  //  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[] = []) => {
        // return new BadRequestException(
        //   validationErrors.map((error) => {
        //     console.log({error})
        //     return ({
        //     field: error.property,
        //     error: Object.values(error.constraints).join(', '),
        //   })}),
        //);
       return new UserInputError('VALIDATION_ERROR', {
          invalidArgs: errors,
        });
      },
    }),
  );
  // await app.enableCors();
  
  await app.listen(process.env.PORT);
}

bootstrap();
