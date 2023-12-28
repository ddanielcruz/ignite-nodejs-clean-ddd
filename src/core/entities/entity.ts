import { UniqueEntityId } from './unique-entity-id'

export abstract class Entity<TAttr> {
  public readonly id: UniqueEntityId
  protected attr: TAttr

  protected constructor(attr: TAttr, id?: UniqueEntityId) {
    this.attr = attr
    this.id = id || new UniqueEntityId()
  }
}
