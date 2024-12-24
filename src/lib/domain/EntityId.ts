import { randomBytes } from 'node:crypto';

export const ENTITY_ID_SIZE = 32;
export const ENTITY_ID_ENCODING = 'base64url';

export class EntityId {
	protected constructor(public readonly value: Buffer) {}

	public toString(): string {
		return this.value.toString(ENTITY_ID_ENCODING);
	}

	protected static _create(): Buffer {
		return randomBytes(ENTITY_ID_SIZE);
	}

	protected static _from(id: string | Buffer): Buffer {
		return id instanceof Buffer ? id : Buffer.from(id.toString(), ENTITY_ID_ENCODING);
	}
}
