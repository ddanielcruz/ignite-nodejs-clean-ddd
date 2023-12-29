import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

import { CreateQuestion } from './create-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let sut: CreateQuestion
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestion(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: 'any_author_id',
      title: 'any_title',
      content: 'any_content',
      attachmentIds: ['1', '2'],
    })

    assert(result.isRight())
    const question = inMemoryQuestionsRepository.items[0]
    expect(question).toEqual(result.value.question)
    expect(question.attachments.getItems()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          questionId: question.id,
          attachmentId: new UniqueEntityId('1'),
        }),
        expect.objectContaining({
          questionId: question.id,
          attachmentId: new UniqueEntityId('2'),
        }),
      ]),
    )
  })
})
