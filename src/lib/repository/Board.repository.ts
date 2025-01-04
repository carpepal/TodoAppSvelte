import type { Board, BoardDto } from '$lib/domain/Board';
import type { TaskDto } from '$lib/domain/Task';
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

	public async getTasksByBoardId(boardId: string): Promise<TaskDto[]> {
		return await this.db('tasks').where('board_id', boardId);
	}

	public async getBoardByTaskId(taskId: string): Promise<BoardDto> {
		console.log('taskId', taskId);
		const a = await this.db('boards')
			.select('boards.id', 'boards.name', 'boards.description', 'boards.user_id')
			.join('tasks', 'boards.id', 'tasks.board_id')
			.where('tasks.id', taskId)
			.first();
		console.log('a', a);
		return a;
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

	public async updateTask(taskId: string, task: TaskDto): Promise<void> {
		const db = this.dbContext;
		await db('tasks').where('id', taskId).update({
			title: task.title,
			description: task.description,
			status: task.status
		});
	}

	public async deleteTask(taskId: string) {
		const db = this.dbContext;
		await db('tasks').where('id', taskId).del();
	}
}
