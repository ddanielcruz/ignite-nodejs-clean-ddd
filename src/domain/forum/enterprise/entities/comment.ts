import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface CommentAttr {
  authorId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export abstract class Comment<TAttr extends CommentAttr> extends Entity<TAttr> {
  get authorId(): UniqueEntityId {
    return this.attr.authorId
  }

  get content(): string {
    return this.attr.content
  }

  set content(value: string) {
    this.attr.content = value
    this.touch()
  }

  get createdAt(): Date {
    return this.attr.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.attr.updatedAt
  }

  protected touch() {
    this.attr.updatedAt = new Date()
  }
}
