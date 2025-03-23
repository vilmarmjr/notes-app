import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@server/shared';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  existsByEmail(email: string) {
    return this.repository.exists({ where: { email } });
  }

  save(user: Partial<User>) {
    return this.repository.save(user);
  }
}
