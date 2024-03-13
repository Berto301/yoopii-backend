import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as cors from "cors"
import * as dotenv from 'dotenv';

async function bootstrap() {
  var whitelist = [process.env.URL_FRONT];
  const app = await NestFactory.create(AppModule);
  // await app.use(cors())
  
  await app.enableCors({
  //  origin: function (origin, callback) {
  //     console.log({whitelist,origin,test:whitelist.indexOf(origin) !== -1})
  //     if (whitelist.indexOf(origin) !== -1) {
  //       console.log(whitelist)
  //       callback(null, true)
  //     } else {
  //       console.log("blocked cors for:", origin)
  //       callback(new Error('Not allowed by CORS'))
  //     }
  // },
  // origin:true,
  // origin: function (origin, callback) {
  //   if (!origin || whitelist.indexOf(origin) !== -1) {
  //     console.log("inside",{whitelist})
  //     callback(null, true)
  //   } else {
  //     callback(new Error('Not allowed by CORS'))
  //   }
  // },
  origin:"*",
  methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
  credentials: true,
  // allowedHeaders: ['Authorization', 'Content-Type',],
  //allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe,Authorization,X-Custom-Information',
  allowedHeaders:'Accept, Content-TypeOrigin, X-Requested-With, Content-Type, Accept',
  optionsSuccessStatus: 200,
  preflightContinue: false
  });
  await app.listen(process.env.PORT);
}
bootstrap();
