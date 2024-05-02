import { Injectable } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Configuration, ConfigurationDocument } from './schema/configuration.schema';
import { Model } from 'mongoose';
import { CreateConfigurationDto, updateConfigurationDto } from './dto/configuration.dto';
import { CurrentUser } from 'src/decorators/get-user-id.decorator';
import { UsersModel } from 'src/users/schema/user.schema';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectModel(Configuration.name) private configurationModel: Model<ConfigurationDocument>,
  ) {}
  async create(createConfigurationDto: CreateConfigurationDto): Promise<Configuration> {
    const createdConfiguration = new this.configurationModel({
      ...createConfigurationDto,
      userId: createConfigurationDto.userId,
    });
  
    return createdConfiguration.save();
  }

  async findAll(): Promise<Configuration[]> {
    return this.configurationModel.find().exec();
  }

  async update(updateConfiguration: updateConfigurationDto): Promise<Configuration | undefined> {
    try {
        const _config = await this.configurationModel.findOneAndUpdate(
            { _id: updateConfiguration._id },
            updateConfiguration,
            { new: true }
        );

        if (_config?._id) {
            return _config;
        } else {
            throw new Error('_config not found');
        }
    } catch (error) {
        console.error('Error updating _config:', error);
        return undefined;
    }
  }

  async findById(id:string) : Promise<Configuration | undefined> {
    const _config = await this.configurationModel.findOne({ userId: id }).exec();
    console.log({_config})
    if (_config) return _config;
      return undefined
    }
}
