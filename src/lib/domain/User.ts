import { EntityId } from './EntityId';

export class UserId extends EntityId {
	public static create(): UserId {
		return new UserId(UserId._create());
	}

	public static from(id: string | Buffer): UserId {
		return new UserId(UserId._from(id));
	}
}

export interface UserDto {
	id: string;
	name: string;
	email: string;
}

export class User {
	constructor(
		private readonly _id: UserId,
		private readonly _name: string,
		private readonly _email: string
	) {}

	public static create(name: string, email: string): User {
		return new User(UserId.create(), name, email);
	}

	public static from(user: UserDto): User {
		return new User(UserId.from(user.id), user.name, user.email);
	}

	public toDto(): UserDto {
		return {
			id: this._id.toString(),
			name: this._name,
			email: this._email
		};
	}

	public get id(): UserId {
		return this._id;
	}

	public get name(): string {
		return this._name;
	}

	public get email(): string {
		return this._email;
	}
}
