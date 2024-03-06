import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as cors from "cors"
import * as dotenv from 'dotenv';

async function bootstrap() {
  var whitelist = [process.env.URL_FRONT];
  const app = await NestFactory.create(AppModule);
  // await app.use(cors())
  console.log({whitelist})
  await app.enableCors({
  //   origin: function (origin, callback) {
  //     if (whitelist.indexOf(origin) !== -1) {
  //       console.log("allowed cors for:", origin)
  //       callback(null, true)
  //     } else {
  //       console.log("blocked cors for:", origin)
  //       callback(new Error('Not allowed by CORS'))
  //     }
  // },
 // allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  origin:whitelist,
  methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type',]
  });
  await app.listen(process.env.PORT);
}
bootstrap();
