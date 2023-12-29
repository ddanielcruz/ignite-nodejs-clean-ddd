import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface QuestionAttachmentAttr {
  questionId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class QuestionAttachment extends Entity<QuestionAttachmentAttr> {
  get questionId(): UniqueEntityId {
    return this.attr.questionId
  }

  get attachmentId(): UniqueEntityId {
    return this.attr.attachmentId
  }

  static create(
    attr: QuestionAttachmentAttr,
    id?: UniqueEntityId,
  ): QuestionAttachment {
    return new QuestionAttachment(attr, id)
  }
}
