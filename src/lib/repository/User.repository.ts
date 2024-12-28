import type { User } from '$lib/domain/User';
import type { Knex } from 'knex';

export class UserReadRepository {
	private readonly dbcontext: Knex;
	constructor(opts: { dbcontext: Knex }) {
		this.dbcontext = opts.dbcontext;
	}

	async getUserById(id: string) {
		return this.dbcontext('users').where({ id }).first();
	}

	async getUserByEmail(email: string) {
		return this.dbcontext('users').where({ email }).first();
	}
}

export class UserWriteRepository {
	private readonly dbcontext: Knex;
	constructor(opts: { dbcontext: Knex }) {
		this.dbcontext = opts.dbcontext;
	}
	async createUser(user: User) {
		const db = this.dbcontext;
		return await db('users').insert({
			id: user.id.toString(),
			name: user.name,
			email: user.email
		});
	}
}
