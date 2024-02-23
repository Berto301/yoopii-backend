import { Field, InputType  } from "@nestjs/graphql";
import { Prop } from "@nestjs/mongoose";


@InputType()
export class PersonnalInfoInput {
  @Field()
  name: string;

  @Field()
  firstname: string;

  @Field()
  profesionnalName: string;
 
  @Field()
  gender: string;

  @Field()
  adress : string;

  @Field(()=> Date)
  dateOfBirth : Date  
}

@InputType()
export class AuthentificationInput {
    @Field(() => String)
    @Prop({
        required: true,
        unique: true,
        validate: { validator: (data)=> /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data) },
    })
    email: string;
    
    @Field(() => String)
    @Prop({ required: true })
    password: string;
}

@InputType()
export class LicenceInput {
  @Field()
  NIF_STAT: string;

  @Field()
  deliveryPlace: string;

  @Field(()=> Date)
  deleiveryDate : Date  
}

@InputType()
export class AccountSettingsInput {
  @Field()
  @Prop({
    type:String,
    default:"en"
  })
  language: string;

  @Field()
  facebookSynchronisation: string;

  @Field()
  googleSynchronisation : string  
}

