import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerRequest {
  authorId: string
  answerId: string
}

export class DeleteAnswer {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({ authorId, answerId }: DeleteAnswerRequest): Promise<void> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (answer.authorId.value !== authorId) {
      throw new Error('Forbidden.')
    }

    await this.answersRepository.delete(answer)
  }
}
