import { Board } from '$lib/domain/Board';
import { User } from '$lib/domain/User';
import type { BoardWriteRepository } from '$lib/repository/Board.repository';
import type { UserReadRepository, UserWriteRepository } from '$lib/repository/User.repository';
import { error } from '@sveltejs/kit';
import type { Knex } from 'knex';

export class UserService {
	private readonly userReadRepository: UserReadRepository;
	private readonly userWriteRepository: UserWriteRepository;
	private readonly boardWriteRepository: BoardWriteRepository;
	private readonly dbContext: Knex;
	constructor(opts: {
		UserReadRepository: UserReadRepository;
		UserWriteRepository: UserWriteRepository;
		BoardWriteRepository: BoardWriteRepository;
		dbcontext: Knex;
	}) {
		this.userReadRepository = opts.UserReadRepository;
		this.userWriteRepository = opts.UserWriteRepository;
		this.boardWriteRepository = opts.BoardWriteRepository;
		this.dbContext = opts.dbcontext;
	}

	public async createNewUser(name: string, email: string): Promise<User> {
		const userExists = await this.userReadRepository.getUserByEmail(email);
		if (userExists) {
			error(400, 'User already exists');
		}

		const user = User.create(name, email);
		const board = Board.create('default', '', user.id);

		// this can be change to a transaction manager that it can not be technology dependent
		await this.dbContext.transaction(async (trx) => {
			this.userWriteRepository.createUser(user);
			this.boardWriteRepository
				.createBoard(board)
				.then((inserts) => {
					console.log('inserts', inserts);
					trx.commit();
				})
				.catch((err) => {
					console.log('err', err);
					trx.rollback();
				});
		});
		return user;
	}

	public async logUser(email: string): Promise<User> {
		const user = await this.userReadRepository.getUserByEmail(email);
		return new User(user.id, user.name, user.email);
	}
}
