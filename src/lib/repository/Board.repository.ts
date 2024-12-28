import type { Board, BoardDto } from '$lib/domain/Board';
import type { Knex } from 'knex';

export class BoardReadRepository {
	private db: Knex;

	constructor(opts: { dbcontext: Knex }) {
		this.db = opts.dbcontext;
	}

	public async getBoardById(id: string): Promise<Board> {
		return await this.db('boards').where('id', id).first();
	}

	public async getBoardByUserId(userId: string): Promise<BoardDto[]> {
		return await this.db('boards').where('user_id', userId);
	}
}

export class BoardWriteRepository {
	private dbContext: Knex;

	constructor(opts: { dbcontext: Knex }) {
		this.dbContext = opts.dbcontext;
	}

	public async createBoard(board: Board): Promise<void> {
		const db = this.dbContext;
		const boardDto = board;
		await db('boards').insert({
			id: boardDto.id.toString(),
			name: boardDto.name,
			description: boardDto.description,
			user_id: boardDto.userId?.toString()
		});
	}
}
