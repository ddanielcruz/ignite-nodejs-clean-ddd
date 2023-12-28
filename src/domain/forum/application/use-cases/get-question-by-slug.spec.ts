import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

import { GetQuestionBySlug } from './get-question-by-slug'
import { makeQuestion } from 'tests/factories/make-question'

let sut: GetQuestionBySlug
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlug(inMemoryQuestionsRepository)
  })

  it('should get a question by slug', async () => {
    const newQuestion = makeQuestion()
    await inMemoryQuestionsRepository.create(newQuestion)
    const { question } = await sut.execute({ slug: newQuestion.slug.value })
    expect(question.id).toBeTruthy()
    expect(question.id).toEqual(newQuestion.id)
  })
})
