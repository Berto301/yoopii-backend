import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {AccountSettings,Licence,PersonnalInfo} from "./sub-Object.schema"
import * as bcrypt from 'bcryptjs';

export type UserDocument = UsersModel &
  Document & {
    checkPassword(password: string): Promise<boolean>
  };
@Schema()
@ObjectType()
export class UsersModel extends Document {
  @Field()
  _id: string;
  
  @Field(() => Boolean)
  @Prop({
    type: Boolean,
    default: true,
  })
  enabled: boolean;

  // @Field(() => PersonnalInfo)
  // @Prop({ type: PersonnalInfo })
  // personnalInfo: PersonnalInfo;
  @Prop({
    type:String
  })
  @Field()
  name: string;
  @Prop({
    type:String,
    default:""
  })
  @Field()
  firstname: string;
  @Prop({
    type:String,
    default:""
  })
  @Field()
  profesionnalName: string;
  @Prop({
    type:String,
    default:""
  })
  @Field()
  gender: string;
  @Prop({
    type:String,
    default:""
  })
  @Field()
  adress : string;
  @Prop({
    type:String,
    default:""
  })

  // @Prop({
  //   type:Date
  // })
  // @Field(()=> Date)
  // dateOfBirth : Date  
  @Prop({
    type:Date
  })
  @Field(()=> Date)
  dateOfBirth : Date  
  @Prop({
    type:Date
  })
  @Field(()=> Date)
  birthOfDate : Date  
  

  @Field(() => [String!]!)
  @Prop({
    type: [String!]!,
    required: true,
  })
  permissions:string[]

  // @Field(()=> Licence)
  // @Prop({ type: Licence })
  // licence:Licence
  @Prop({
    type:String,
    default:""
  })
  @Field()
  NIF_STAT: string;
  @Prop({
    type:String,
    default:""
  })
  @Field()
  deliveryPlace: string;
  @Prop({
    type:Date
  })
  @Field(()=> Date)
  deliveryDate : Date  

  // @Field(() => AccountSettings)
  // @Prop({ type: AccountSettings })
  // accountSettings:AccountSettings
  @Field()
  @Prop({
    type:String,
    default:"en"
  })
  language: string;
  @Prop({
    type:String,
    default:""
  })
  @Field()
  facebookSynchronisation: string;
  @Prop({
    type:String,
    default:""
  })
  @Field()
  googleSynchronisation : string  

  @Field(() => String)
    @Prop({
        required: true,
        unique: true,
        validate: { validator: (data)=> /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data) },
    })
  email: string;

  @Prop({ required: true })
  password: string;

  @Field(() => Date)
  @Prop()
  timestamp: Date;
}

export const UsersSchema = SchemaFactory.createForClass(UsersModel);


UsersSchema.methods.checkPassword = function (
  password: string,
): Promise<boolean> {
  const user = this as UserDocument;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (error, isMatch) => {
      if (error) {
        reject(error);
      }
      resolve(isMatch);
    });
  });
};
