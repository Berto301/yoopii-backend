import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
// import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './config/config.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<MongooseModuleOptions> => ({
        uri: configService.mongoUri,
        // useNewUrlParser: true,
        //useUnifiedTopology: true,

      }),
      inject: [ConfigService],
    }),
    // ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.MONGO_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
      formatError: (error: GraphQLError) => {
        if (error.message === 'VALIDATION_ERROR') {
          // const extensions = {
          //   code: 'VALIDATION_ERROR',
          //   validation: [],
          // };

          // Object.keys(error.extensions.invalidArgs).forEach((key) => {
          //   const constraints = [];
          //   Object.keys(error.extensions.invalidArgs[key].constraints).forEach(
          //     (_key) => {
          //       constraints.push(
          //         error.extensions.invalidArgs[key].constraints[_key],
          //       );
          //     },
          //   );

          //   extensions.validation.push({
          //     field: error.extensions.invalidArgs[key].property,
          //     input: constraints,
          //   });
          // });

          // const graphQLFormattedError: GraphQLFormattedError = {
          //   message: 'VALIDATION_ERROR',
          //   extensions: extensions,
          // };
          let errorsFormatted = {};
          Object.keys(error.extensions.invalidArgs).forEach((key) => {
            const { constraints, property } = error.extensions.invalidArgs[key];
            errorsFormatted[property] = Object.entries(constraints).map(([field, message]) => ({ field, message }));
          });

          const graphQLFormattedError: GraphQLFormattedError = {
            message: 'VALIDATION_ERROR',
            extensions: {
              validation: { input: errorsFormatted },
            },
          };
          return graphQLFormattedError;
        } else {
          return error;
        }
      },
    }),
    AuthModule,
    UsersModule
  ],
  providers: [],
})
export class AppModule {}
