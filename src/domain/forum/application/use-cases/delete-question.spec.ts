import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

import { DeleteQuestion } from './delete-question'
import { makeQuestion } from 'tests/factories/make-question'
import { NotAllowedError } from './errors/not-allowed-error'

let sut: DeleteQuestion
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestion(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const questionToDelete = makeQuestion()
    await inMemoryQuestionsRepository.create(questionToDelete)
    const result = await sut.execute({
      authorId: questionToDelete.authorId.value,
      questionId: questionToDelete.id.value,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const questionToDelete = makeQuestion()
    await inMemoryQuestionsRepository.create(questionToDelete)
    const result = await sut.execute({
      authorId: 'another_user',
      questionId: questionToDelete.id.value,
    })

    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
  })
})
