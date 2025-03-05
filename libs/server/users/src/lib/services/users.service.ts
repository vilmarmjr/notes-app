import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@server/shared/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private _repository: Repository<User>) {}

  findById(id: string) {
    return this._repository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this._repository.findOneBy({ email });
  }

  existsByEmail(email: string) {
    return this._repository.exists({ where: { email } });
  }

  save(email: string, password: string) {
    return this._repository.save({ email, password });
  }
}
