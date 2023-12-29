import { makeQuestion } from 'tests/factories/make-question'

import { FetchQuestionAnswers } from './fetch-question-answers'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'
import { makeAnswer } from 'tests/factories/make-answer'

let sut: FetchQuestionAnswers
let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswers(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    const question = makeQuestion()
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question.id }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question.id }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: question.id }),
    )

    const { answers } = await sut.execute({
      questionId: question.id.value,
      page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated answers', async () => {
    const question = makeQuestion()
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: question.id }),
      )
    }

    const { answers } = await sut.execute({
      questionId: question.id.value,
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
