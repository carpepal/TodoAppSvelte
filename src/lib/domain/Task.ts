import { EntityId } from './EntityId';

export class TaskId extends EntityId {
	public static create(): TaskId {
		return new TaskId(TaskId._create());
	}

	public static from(id: string | Buffer): TaskId {
		return new TaskId(TaskId._from(id));
	}
}

export interface TaskDto {
	id: string;
	title: string;
	description: string;
	status: string;
}

export enum TaskStatus {
	OPEN = 'OPEN',
	IN_PROGRESS = 'IN_PROGRESS',
	DONE = 'DONE'
}

export class Task {
	constructor(
		private readonly _id: TaskId,
		private readonly _title: string,
		private readonly _description: string,
		private readonly _status: string
	) {}

	public static create(title: string, description: string, status: string): Task {
		return new Task(TaskId.create(), title, description, status);
	}

	public static from(taskDto: TaskDto): Task {
		return new Task(TaskId.from(taskDto.id), taskDto.title, taskDto.description, taskDto.status);
	}

	public toDto(): TaskDto {
		return {
			id: this._id.toString(),
			title: this._title,
			description: this._description,
			status: this._status
		};
	}
}
