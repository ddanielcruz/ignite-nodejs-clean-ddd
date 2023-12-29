import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  public readonly value: string

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  public equals(id?: UniqueEntityId): boolean {
    if (id == null) {
      return false
    }

    if (!(id instanceof this.constructor)) {
      return false
    }

    return id.value === this.value
  }
}
