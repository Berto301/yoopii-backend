import { Injectable } from '@nestjs/common';
// import { Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Enterprise, EnterpriseDocument } from './schema/enterprise.schema';
import { Model } from 'mongoose';
import { CreateEnterpiseDto } from './dto/enterprise.dto';
// import { CurrentUser } from 'src/decorators/get-user-id.decorator';
// import { UsersModel } from 'src/users/schema/user.schema';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectModel(Enterprise.name) private enterpriseModel: Model<EnterpriseDocument>,
  ) {}
  async create(createOrderDto: CreateEnterpiseDto): Promise<Enterprise> {
    const created = new this.enterpriseModel({
      ...createOrderDto,
      // owner: user._id,
    });
    return created.save();
  }

  async findAll(): Promise<Enterprise[]> {
    return this.enterpriseModel.find().exec();
  }

  // async findByUser(id): Promise<Enterprise[]> {
  //   return this.enterpriseModel.find({_id:id}).exec();
  // }

  async findByUser(id: string): Promise<Enterprise | undefined> {
    const enterprise = await this.enterpriseModel
      .findOne({ _id: id })
      .exec();
    if (enterprise) return enterprise;
    return undefined;
  }
}