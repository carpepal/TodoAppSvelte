import type { Board } from '$lib/domain/Board';
import type { Knex } from 'knex';

export class BoardReadRepository {
	private db: Knex;

	constructor(opts: { dbcontext: Knex }) {
		this.db = opts.dbcontext;
	}

	public async getBoardById(id: string): Promise<Board> {
		return await this.db('boards').where('id', id).first();
	}
}

export class BoardWriteRepository {}
