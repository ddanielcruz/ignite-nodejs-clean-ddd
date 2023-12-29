import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { makeAnswer } from 'tests/factories/make-answer'
import { makeQuestion } from 'tests/factories/make-question'

import { ChooseQuestionBestAnswer } from './choose-question-best-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswer

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswer(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository,
    )
  })

  it('should be able to choose question best answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    await inMemoryAnswersRepository.create(answer)
    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      authorId: question.authorId.value,
      answerId: answer.id.value,
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      bestAnswerId: answer.id,
    })
  })

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('user_a'),
    })
    const answer = makeAnswer({ questionId: question.id })

    await inMemoryAnswersRepository.create(answer)
    await inMemoryQuestionsRepository.create(question)

    const promise = sut.execute({
      authorId: 'user_b',
      answerId: answer.id.value,
    })

    await expect(promise).rejects.toThrowError()
    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toBeFalsy()
  })
})
