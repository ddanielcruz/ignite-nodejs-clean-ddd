import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  public readonly value: string

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }
}
