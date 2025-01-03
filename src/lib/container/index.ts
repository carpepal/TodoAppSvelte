import { BoardReadRepository, BoardWriteRepository } from '$lib/repository/Board.repository';
import { TaskReadRepository, TaskWriteRepository } from '$lib/repository/Task.repository';
import { UserReadRepository, UserWriteRepository } from '$lib/repository/User.repository';
import { BoardService } from '$lib/services/Board.service';
import { UserService } from '$lib/services/User.service';
import { asClass, asFunction, asValue, createContainer, Lifetime } from 'awilix';
import knex from 'knex';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { HOST, PORT, USER, PASS, NAME, FILE, ENV } from '$env/static/private';

const container = createContainer();

container.register({
	dbconnection: asValue({
		host: HOST,
		port: PORT,
		user: USER,
		password: PASS,
		database: NAME,
		filename: FILE
	}),
	// Registering repositories
	BoardReadRepository: asClass(BoardReadRepository).singleton(),
	BoardWriteRepository: asClass(BoardWriteRepository).singleton(),

	UserReadRepository: asClass(UserReadRepository).singleton(),
	UserWriteRepository: asClass(UserWriteRepository).singleton(),

	TaskReadRepository: asClass(TaskReadRepository).singleton(),
	TaskWriteRepository: asClass(TaskWriteRepository).singleton(),

	// Registering services

	UserService: asClass(UserService).singleton(),
	BoardService: asClass(BoardService).singleton()
});

if (ENV === 'development') {
	container.register({
		dbcontext: asFunction(
			({ dbconnection }) => {
				return knex({
					client: 'sqlite3',
					connection: {
						filename: dbconnection.filename
					}
				});
			},
			{
				lifetime: Lifetime.SINGLETON
			}
		)
	});
} else {
	container.register({
		dbcontext: asFunction(({ dbconnection }) => knex({ client: 'pg', connection: dbconnection }), {
			lifetime: Lifetime.SINGLETON
		})
	});
}

export default container;
