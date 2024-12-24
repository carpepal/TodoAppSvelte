import type { User } from '$lib/domain/User';
import type { Knex } from 'knex';

export class UserReadRepository {
	private readonly dbcontext: Knex;
	constructor(opts: { dbcontext: Knex }) {
		this.dbcontext = opts.dbcontext;
	}

	getUserById(id: string) {
		return this.dbcontext('users').where({ id }).first;
	}
}

export class UserWriteRepository {
	private readonly dbcontext: Knex;
	constructor(opts: { dbcontext: Knex }) {
		this.dbcontext = opts.dbcontext;
	}
	async createUser(user: User) {
		return await this.dbcontext('users').insert({
			id: user.id.toString(),
			name: user.name,
			email: user.email
		});
	}
}
