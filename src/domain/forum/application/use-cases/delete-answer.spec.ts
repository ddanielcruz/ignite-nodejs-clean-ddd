import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'

import { DeleteAnswer } from './delete-answer'
import { makeAnswer } from 'tests/factories/make-answer'

let sut: DeleteAnswer
let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswer(inMemoryAnswersRepository)
  })

  it('should be able to delete an answer', async () => {
    const answerToDelete = makeAnswer()
    await inMemoryAnswersRepository.create(answerToDelete)
    await sut.execute({
      authorId: answerToDelete.authorId.value,
      answerId: answerToDelete.id.value,
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an answer from another user', async () => {
    const answerToDelete = makeAnswer()
    await inMemoryAnswersRepository.create(answerToDelete)
    const promise = sut.execute({
      authorId: 'another_user',
      answerId: answerToDelete.id.value,
    })

    await expect(promise).rejects.toThrowError()
    expect(inMemoryAnswersRepository.items).toHaveLength(1)
  })
})
