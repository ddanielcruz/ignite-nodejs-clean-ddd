import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'

import { AnswerQuestion } from './answer-question'

let sut: AnswerQuestion
let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('Answer question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestion(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      instructorId: 'any_instructor_id',
      questionId: 'any_question_id',
      content: 'any_content',
    })

    expect(answer.id).toBeTruthy()
    expect(answer.content).toBe('any_content')
    expect(inMemoryAnswersRepository.items.at(0)?.id).toEqual(answer.id)
  })
})
