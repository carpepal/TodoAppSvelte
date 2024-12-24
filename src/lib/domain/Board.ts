import { EntityId } from './EntityId';
import type { Task, TaskDto } from './Task';
import type { UserId } from './User';

export class BoardId extends EntityId {
	public static create(): BoardId {
		return new BoardId(BoardId._create());
	}

	public static from(id: string | Buffer): BoardId {
		return new BoardId(BoardId._from(id));
	}
}

export interface BoardDto {
	id: string;
	name: string;
	description: string;
	tasks: TaskDto[];
}

export class Board {
	constructor(
		private readonly _id: BoardId,
		private readonly _name: string,
		private readonly _description: string,
		private readonly _userId?: UserId,
		private readonly _tasks: Task[] = []
	) {}

	public static create(name: string, description: string, userId: UserId): Board {
		return new Board(BoardId.create(), name, description, userId);
	}

	public static from(boardDto: BoardDto): Board {
		return new Board(BoardId.from(boardDto.id), boardDto.name, boardDto.description);
	}

	public toDto(): BoardDto {
		return {
			id: this._id.toString(),
			name: this._name,
			description: this._description,
			tasks: this._tasks.map((task) => task.toDto())
		};
	}
}