import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

import { makeQuestion } from 'tests/factories/make-question'
import { EditQuestion } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'

let sut: EditQuestion
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestion(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const questionToEdit = makeQuestion()
    await inMemoryQuestionsRepository.create(questionToEdit)
    const result = await sut.execute({
      authorId: questionToEdit.authorId.value,
      questionId: questionToEdit.id.value,
      title: 'new title',
      content: 'new body',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'new title',
      content: 'new body',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const questionToEdit = makeQuestion()
    await inMemoryQuestionsRepository.create(questionToEdit)
    const result = await sut.execute({
      authorId: 'another_user',
      questionId: questionToEdit.id.value,
      title: 'new title',
      content: 'new body',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryQuestionsRepository.items[0]).not.toMatchObject({
      title: 'new title',
      content: 'new body',
    })
  })
})
