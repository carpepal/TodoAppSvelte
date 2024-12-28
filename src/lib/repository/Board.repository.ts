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
	private db: Knex;

	constructor(opts: { dbcontext: Knex }) {
		this.db = opts.dbcontext;
	}

	public async createBoard(board: Board): Promise<void> {
		const boardDto = board.toDto();
		await this.db('boards').insert({
			id: boardDto.id,
			name: boardDto.name,
			description: boardDto.description
		});
	}
}
