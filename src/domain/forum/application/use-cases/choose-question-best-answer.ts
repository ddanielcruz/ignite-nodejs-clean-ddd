import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

interface ChooseQuestionBestAnswerRequest {
  authorId: string
  answerId: string
}

interface ChooseQuestionBestAnswerResponse {
  question: Question
}

export class ChooseQuestionBestAnswer {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.value,
    )
    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.value !== authorId) {
      throw new Error('Forbidden.')
    }

    question.bestAnswerId = answer.id
    await this.questionsRepository.save(question)

    return { question }
  }
}
