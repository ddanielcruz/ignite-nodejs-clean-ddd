import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Comment, CommentAttr } from './comment'

export interface QuestionCommentAttr extends CommentAttr {
  questionId: UniqueEntityId
}

export class QuestionComment extends Comment<QuestionCommentAttr> {
  get questionId(): UniqueEntityId {
    return this.attr.questionId
  }

  static create(
    attr: Optional<QuestionCommentAttr, 'createdAt'>,
    id?: UniqueEntityId,
  ): QuestionComment {
    return new QuestionComment(
      { ...attr, createdAt: attr.createdAt || new Date() },
      id,
    )
  }
}
