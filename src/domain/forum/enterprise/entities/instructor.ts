import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface InstructorAttr {
  name: string
}

export class Instructor extends Entity<InstructorAttr> {
  static create(attr: InstructorAttr, id?: UniqueEntityId): Instructor {
    return new Instructor(attr, id)
  }

  get name(): string {
    return this.attr.name
  }
}
