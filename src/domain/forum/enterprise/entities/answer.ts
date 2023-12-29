import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AnswerAttr {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerAttr> {
  get content(): string {
    return this.attr.content
  }

  set content(value: string) {
    this.attr.content = value
    this.touch()
  }

  get authorId(): UniqueEntityId {
    return this.attr.authorId
  }

  get questionId(): UniqueEntityId {
    return this.attr.questionId
  }

  get createdAt(): Date {
    return this.attr.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.attr.updatedAt
  }

  get excerpt(): string {
    return this.content.slice(0, 120).trim().concat('...')
  }

  static create(
    attr: Optional<AnswerAttr, 'createdAt'>,
    id?: UniqueEntityId,
  ): Answer {
    return new Answer({ ...attr, createdAt: attr.createdAt || new Date() }, id)
  }

  private touch(): void {
    this.attr.updatedAt = new Date()
  }
}
