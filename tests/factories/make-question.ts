import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionAttr,
} from '@/domain/forum/enterprise/entities/question'

export function makeQuestion({
  id,
  ...override
}: Partial<QuestionAttr> & { id?: UniqueEntityId } = {}) {
  return Question.create(
    {
      authorId: new UniqueEntityId('any_author_id'),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
}
