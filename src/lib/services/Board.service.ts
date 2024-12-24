import { Board, BoardId } from '$lib/domain/Board';
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
}
