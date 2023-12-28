import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface StudentAttr {
  name: string
}

export class Student extends Entity<StudentAttr> {
  static create(attr: StudentAttr, id?: UniqueEntityId): Student {
    return new Student(attr, id)
  }

  get name(): string {
    return this.attr.name
  }
}
