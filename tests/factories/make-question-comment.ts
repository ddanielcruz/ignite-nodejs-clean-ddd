import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  QuestionComment,
  QuestionCommentAttr,
} from '@/domain/forum/enterprise/entities/question-comment'

export function makeQuestionComment({
  id,
  ...override
}: Partial<QuestionCommentAttr> & { id?: UniqueEntityId } = {}) {
  return QuestionComment.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
}
