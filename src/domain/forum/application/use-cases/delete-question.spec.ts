import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

import { DeleteQuestion } from './delete-question'
import { makeQuestion } from 'tests/factories/make-question'

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
    await sut.execute({
      authorId: questionToDelete.authorId.value,
      questionId: questionToDelete.id.value,
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const questionToDelete = makeQuestion()
    await inMemoryQuestionsRepository.create(questionToDelete)
    const promise = sut.execute({
      authorId: 'another_user',
      questionId: questionToDelete.id.value,
    })

    await expect(promise).rejects.toThrowError()
    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
  })
})
