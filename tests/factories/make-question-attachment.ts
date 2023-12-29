import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  QuestionAttachment,
  QuestionAttachmentAttr,
} from '@/domain/forum/enterprise/entities/question-attachment'

export function makeQuestionAttachment({
  id,
  ...override
}: Partial<QuestionAttachmentAttr> & { id?: UniqueEntityId } = {}) {
  return QuestionAttachment.create(
    {
      attachmentId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      ...override,
    },
    id,
  )
}
