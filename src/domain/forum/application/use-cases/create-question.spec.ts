import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

import { CreateQuestion } from './create-question'

let sut: CreateQuestion
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestion(inMemoryQuestionsRepository)
  })

  it('should create a question', async () => {
    const { question } = await sut.execute({
      authorId: 'any_author_id',
      title: 'any_title',
      content: 'any_content',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items.at(0)?.id).toEqual(question.id)
  })
})
