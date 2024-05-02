import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UsersModel } from '../../users/schema/user.schema';
import * as mongoose from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type ConfigurationDocument = Configuration & Document;

@Schema()
@ObjectType()
export class Configuration {
  @Prop()
  @Field()
  format: string;

  @Prop()
  @Field()
  timezone: string;

  @Prop()
  @Field()
  taux: number;

  @Prop()
  @Field()
  devise: string;


  @Field(() => UsersModel)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: UsersModel;
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);
