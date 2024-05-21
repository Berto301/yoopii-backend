import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EnterpriseDocument = Enterprise &
  Document & {
    checkPassword(password: string): Promise<boolean>
  };
@Schema()
@ObjectType()
export class Enterprise extends Document {
  @Field()
  _id: string;
  
  @Prop({
    type:String
  })
  @Field()
  enterpiseName: string;

  @Prop({
    type:String,
    default:""
  })
  @Field()
  enterpiseAdress : string;

  @Prop({
    type:String,
    default:""
  })
  @Field()
  enterpisePhone: string;
  
  @Field(() => String)
    @Prop({
        required: true,
        unique: true,
        validate: { validator: (data)=> /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data) },
    })
    enterpiseEmail: string;

  @Prop({
    type:String,
    default:""
  })
  @Field()
  enterpiseNIF_STAT: string;
  @Prop({
    type:String,
    default:""
  })
  @Field()
  enterpiseDeliveryPlace: string;
  @Prop({
    type:Date
  })
  @Field(()=> Date)
  enterpiseDeliveryDate : Date  

  @Prop({
    type:String
  })
  @Field()
  linkedin: string;
  @Prop({
    type:String
  })
  @Field()
  facebook: string;
  @Prop({
    type:String
  })
  @Field()
  whatsapp: string;

  @Prop({ type: [String] })
  @Field(() => [String])
  services: string[];

  @Field(() => Date)
  @Prop()
  timestamp: Date;
}

export const EnterpriseSchema = SchemaFactory.createForClass(Enterprise);
