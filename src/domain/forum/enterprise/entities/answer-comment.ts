import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Comment, CommentAttr } from './comment'

export interface AnswerCommentAttr extends CommentAttr {
  answerId: UniqueEntityId
}

export class AnswerComment extends Comment<AnswerCommentAttr> {
  get answerId(): UniqueEntityId {
    return this.attr.answerId
  }

  static create(
    attr: Optional<AnswerCommentAttr, 'createdAt'>,
    id?: UniqueEntityId,
  ): AnswerComment {
    return new AnswerComment(
      { ...attr, createdAt: attr.createdAt || new Date() },
      id,
    )
  }
}
