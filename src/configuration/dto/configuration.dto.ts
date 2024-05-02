import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';
// import { Order } from '../schema/configuration.schema';

// @InputType()
// export class CreateOrderDto {
//   @Field()
//   name: string;

//   @Field(() => Order)
//   owner: Order;
// }

@InputType()
export class CreateConfigurationDto {
  @Field(() => String)
  timezone: string;
  @Field(() => String)
  userId: string;
  @Field(() => String)
  format:string;
  @Field(() => Number)
  taux:number;
  @Field(() => String)
  devise:string
}

@InputType()
export class updateConfigurationDto {
  @Field(() => String)
  _id: string;
  @Field(() => String)
  timezone: string;
  @Field(() => String)
  userId: string;
  @Field(() => String)
  format:string;
  @Field(() => Number)
  taux:number;
  @Field(() => String)
  devise:string
}

@ObjectType()
export class CreatedConfigurationDto {
  @Field()
  _id: string;
  @Field(() => String)
  timezone: string;
  @Field(() => String)
  userId: string;
  @Field(() => String)
  format:string;
  @Field(() => Number)
  taux:number;
  @Field(() => String)
  devise:string
}
