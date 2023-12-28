import dayjs from 'dayjs'

import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Slug } from './value-objects/slug'

interface QuestionAttr {
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  slug: Slug
  title: string
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionAttr> {
  static create(attr: Optional<QuestionAttr, 'createdAt' | 'slug'>, id?: UniqueEntityId): Question {
    return new Question(
      {
        ...attr,
        slug: attr.slug || Slug.createFromText(attr.title),
        createdAt: attr.createdAt || new Date()
      },
      id
    )
  }

  get authorId(): UniqueEntityId {
    return this.attr.authorId
  }

  get bestAnswerId(): UniqueEntityId | undefined {
    return this.attr.bestAnswerId
  }

  set bestAnswerId(value: UniqueEntityId | undefined) {
    this.attr.bestAnswerId = value
    this.touch()
  }

  get slug(): Slug {
    return this.attr.slug
  }

  get title(): string {
    return this.attr.title
  }

  set title(value: string) {
    this.attr.title = value
    this.attr.slug = Slug.createFromText(value)
    this.touch()
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

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  private touch(): void {
    this.attr.updatedAt = new Date()
  }
}
