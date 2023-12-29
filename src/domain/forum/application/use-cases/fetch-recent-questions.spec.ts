import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

import { makeQuestion } from 'tests/factories/make-question'
import { FetchRecentQuestions } from './fetch-recent-questions'

let sut: FetchRecentQuestions
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestions(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2021-01-01') }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2021-01-02') }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2021-01-03') }),
    )

    const { questions } = await sut.execute({ page: 1 })

    expect(questions).toHaveLength(3)
    expect(questions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ createdAt: new Date('2021-01-03') }),
        expect.objectContaining({ createdAt: new Date('2021-01-02') }),
        expect.objectContaining({ createdAt: new Date('2021-01-01') }),
      ]),
    )
  })

  it('should be able to fetch paginated questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({ createdAt: new Date(`2021-01-${i}`) }),
      )
    }

    const { questions } = await sut.execute({ page: 2 })
    expect(questions).toHaveLength(2)
  })
})
