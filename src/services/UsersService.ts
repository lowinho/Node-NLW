import { Repository } from 'typeorm';
import { getCustomRepository } from 'typeorm';
import { User } from '../entities/Users';
import { UsersRepository } from '../repositories/UsersRepository';

class UsersService {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create(email: string) {

        const userExists = await this.usersRepository.findOne({
            email,
        });

        if (userExists) {
            return userExists;
        };

        const user = this.usersRepository.create({
            email,
        });
    
        await this.usersRepository.save(user);

        return user;
    }

    async findByEmail(email: string) {  
      
        const user = await this.usersRepository.findOne({ email });

        return user;
      }
    }

export { UsersService };