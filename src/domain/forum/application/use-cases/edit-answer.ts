import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerResponse {
  answer: Answer
}

export class EditAnswer {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerRequest): Promise<EditAnswerResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (answer.authorId.value !== authorId) {
      throw new Error('Forbidden.')
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return { answer }
  }
}
