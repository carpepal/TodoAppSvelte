import { Board } from '$lib/domain/Board';
import { Task } from '$lib/domain/Task';
import { UserId } from '$lib/domain/User';
import type { BoardReadRepository, BoardWriteRepository } from '$lib/repository/Board.repository';

export class BoardService {
	private readonly boardReadRepository: BoardReadRepository;
	private readonly boardWriteRepository: BoardWriteRepository;

	constructor(opts: {
		BoardReadRepository: BoardReadRepository;
		BoardWriteRepository: BoardWriteRepository;
	}) {
		this.boardReadRepository = opts.BoardReadRepository;
		this.boardWriteRepository = opts.BoardWriteRepository;
	}

	public createNewBoard(name: string, description: string, userId: string): void {
		Board.create(name, description, UserId.from(userId));
	}

	public async getBoardById(id: string): Promise<Board> {
		return await this.boardReadRepository.getBoardById(id);
	}

	public async getBoardByUserId(userId: string): Promise<Board[]> {
		const boards = await this.boardReadRepository.getBoardByUserId(userId);

		return boards.map((board) => Board.from(board));
	}

	public async getTasksByBoardId(boardId: string): Promise<Task[]> {
		const tasks = await this.boardReadRepository.getTasksByBoardId(boardId);

		return tasks.map((task) => Task.from(task));
	}

	public async getBoardByTaskId(taskId: string): Promise<Board> {
		const board = await this.boardReadRepository.getBoardByTaskId(taskId);

		return Board.from(board);
	}

	public async updateTask(taskId: string, task: Task): Promise<void> {
		await this.boardWriteRepository.updateTask(taskId, task.toDto());
	}
}
