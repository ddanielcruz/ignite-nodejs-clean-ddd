import { Entity } from '@/core/entities/entity'

interface AnswerAttachmentAttr {
  answerId: string
  attachmentId: string
}

export class AnswerAttachment extends Entity<AnswerAttachmentAttr> {
  get answerId(): string {
    return this.attr.answerId
  }

  get attachmentId(): string {
    return this.attr.attachmentId
  }

  static create(attr: AnswerAttachmentAttr): AnswerAttachment {
    return new AnswerAttachment(attr)
  }
}
