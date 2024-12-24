import { Board } from '$lib/domain/Board';
import { User } from '$lib/domain/User';
import type { UserReadRepository, UserWriteRepository } from '$lib/repository/User.repository';

export class UserService {
	private readonly userReadRepository: UserReadRepository;
	private readonly userWriteRepository: UserWriteRepository;
	constructor(opts: {
		UserReadRepository: UserReadRepository;
		UserWriteRepository: UserWriteRepository;
	}) {
		this.userReadRepository = opts.UserReadRepository;
		this.userWriteRepository = opts.UserWriteRepository;
	}
	public createNewUser(name: string, email: string): User {
		const user = User.create(name, email);
		Board.create('default', '', user.id);
		// const a = this.userWriteRepository.createUser(user);
		return user;
	}
}
