import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateEnterpiseDto {
  @IsNotEmpty({
    always:true,
    message:"Name is required"
  })
  @Field()
  enterpiseName: string;
  @IsEmail()
  @Field(() => String)
  @Prop({
      required: true,
      unique: true,
      validate: { validator: (data)=> /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data) },
  })
  enterpiseEmail: string

  @IsString()
  @Field()
  enterpiseNIF_STAT: string;
  @IsString()
  @Field()
  enterpiseDeliveryPlace: string;
  @IsDate()
  @Field(()=> Date)
  enterpiseDeliveryDate : Date  

  // @Field(() => AccountSettingsInput)
  // accountSettings: AccountSettingsInput;
  @IsString()
  @Field()
  @Prop({
    type:String,
    default:""
  })
  enterpiseAdress: string;
  @IsString()
  @Field()
  enterpisePhone: string;

}

@ObjectType()
export class CreatedEnterpriseDto {
  @Field()
  _id: string;
  @Field()
  name: string;

  @Field()
  email: string;
}