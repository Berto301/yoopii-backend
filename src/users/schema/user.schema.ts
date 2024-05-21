import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {AccountSettings,Licence,PersonnalInfo} from "./sub-Object.schema"
import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
import { Enterprise } from "src/enterprise/schema/enterprise.schema";

export type UserDocument = UsersModel &
  Document & {
    checkPassword(password: string): Promise<boolean>
  };
@Schema()
@ObjectType()
export class UsersModel extends Document {
  @Field()
  _id: string;

  @Field(() => Enterprise)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Enterprise', default:null})
  enterprise: Enterprise;
  
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
    default:"user"
  })

  @Field()
  type: string;
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
    type:Date
  })
  @Field(()=> Date)
  dateOfBirth : Date  
  // @Prop({
  //   type:Date
  // })
  // @Field(()=> Date)
  // birthOfDate : Date  
  
  @Prop({
    type:String,
    default:"Super Admin"
  })
  @Field()
  role : string;
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
  phone: string;

  @Prop({
    type:String,
    default:""
  })
  @Field()
  CIN: string;
  @Prop({
    type:String,
    default:""
  })
  @Field()
  linkedin: string;
  @Prop({
    type:String,
    default:""
  })
  @Field()
  facebook: string;
  @Prop({
    type:String,
    default:""
  })
  @Field()
  whatsapp: string;
  @Prop({
    type:String,
    default:""
  })
  @Field()
  portfolio: string;
  @Prop({
    type:String,
    default:""
  })
  @Field()
  siteweb: string;
  @Prop({
    type:String,
    default:""
  })
  @Field()
  note: string;

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
