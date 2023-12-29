import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'

import { makeAnswer } from 'tests/factories/make-answer'
import { EditAnswer } from './edit-answer'

let sut: EditAnswer
let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswer(inMemoryAnswersRepository)
  })

  it('should be able to edit an answer', async () => {
    const answerToEdit = makeAnswer()
    await inMemoryAnswersRepository.create(answerToEdit)
    await sut.execute({
      authorId: answerToEdit.authorId.value,
      answerId: answerToEdit.id.value,
      content: 'new body',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'new body',
    })
  })

  it('should not be able to edit an answer from another user', async () => {
    const answerToEdit = makeAnswer()
    await inMemoryAnswersRepository.create(answerToEdit)
    const promise = sut.execute({
      authorId: 'another_user',
      answerId: answerToEdit.id.value,
      content: 'new body',
    })

    await expect(promise).rejects.toThrowError()
    expect(inMemoryAnswersRepository.items[0]).not.toMatchObject({
      title: 'new title',
      content: 'new body',
    })
  })
})
