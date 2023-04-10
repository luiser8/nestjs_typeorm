import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'src/entities/profile.entity';
import { ProfileDto } from './dto/profileDto';

@Injectable()
export class ProfileService {
  constructor (
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) { }

  public async getProfile() {
    return await this.profileRepository.find();
  }

  public async getProfileId(id: number) {
    const role = await this.profileRepository.findOne({ where: { id } });
    if (!role) {
      return new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return role;
  }

  public async createProfile(profile: ProfileDto) {
    const existsProfile = await this.profileRepository.findOne({
      where: { email: profile.email },
    });

    if (existsProfile) {
      return new HttpException('Profile already exists', HttpStatus.CONFLICT);
    }

    const newProfile = this.profileRepository.create(profile);
    return await this.profileRepository.save(newProfile);
  }

  public async deleteProfile(id: number) {
    const result = await this.profileRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  public async updateProfile(id: number, profile: ProfileDto) {
    const existsProfile = await this.profileRepository.findOne({
      where: { id },
    });

    if (!existsProfile) {
      return new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    return await this.profileRepository.update({ id }, profile);
  }
}
