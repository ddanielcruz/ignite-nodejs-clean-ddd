import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer, AnswerAttr } from '@/domain/forum/enterprise/entities/answer'

export function makeAnswer({
  id,
  ...override
}: Partial<AnswerAttr> & { id?: UniqueEntityId } = {}) {
  return Answer.create(
    {
      authorId: new UniqueEntityId('any_author_id'),
      questionId: new UniqueEntityId('any_question_id'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
}
