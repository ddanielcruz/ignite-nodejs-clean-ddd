import { AnswerQuestion } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'

let sut: AnswerQuestion

const fakeAnswersRepository: AnswersRepository = {
  async create() {},
}

describe('Answer question', () => {
  beforeEach(() => {
    sut = new AnswerQuestion(fakeAnswersRepository)
  })

  it('should create an answer', async () => {
    const { answer } = await sut.execute({
      instructorId: 'any_instructor_id',
      questionId: 'any_question_id',
      content: 'any_content',
    })

    expect(answer.id).toBeTruthy()
    expect(answer.content).toBe('any_content')
  })
})
