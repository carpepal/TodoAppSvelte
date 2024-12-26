import { Board } from '$lib/domain/Board';
import { User } from '$lib/domain/User';
import type { BoardWriteRepository } from '$lib/repository/Board.repository';
import type { UserReadRepository, UserWriteRepository } from '$lib/repository/User.repository';
import { error } from 'console';

export class UserService {
	private readonly userReadRepository: UserReadRepository;
	private readonly userWriteRepository: UserWriteRepository;
	private readonly boardWriteRepository: BoardWriteRepository;
	constructor(opts: {
		UserReadRepository: UserReadRepository;
		UserWriteRepository: UserWriteRepository;
		BoardWriteRepository: BoardWriteRepository;
	}) {
		this.userReadRepository = opts.UserReadRepository;
		this.userWriteRepository = opts.UserWriteRepository;
		this.boardWriteRepository = opts.BoardWriteRepository;
	}
	public async createNewUser(name: string, email: string): Promise<User> {
		const user = User.create(name, email);
		const board = Board.create('default', 'default', user.id);
		const a = await this.userWriteRepository.createUser(user);
		if (!a) {
			error(500, 'Error creating user');
		}

		const savedBoard = this.boardWriteRepository.createBoard(board);

		if (!savedBoard) {
			error(500, 'Error creating board');
		}
		return user;
	}

	public async logUser(email: string): Promise<User> {
		const user = await this.userReadRepository.getUserByEmail(email);
		return new User(user.id, user.name, user.email);
	}
}
