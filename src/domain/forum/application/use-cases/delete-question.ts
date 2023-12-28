import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionRequest {
  authorId: string
  questionId: string
}

export class DeleteQuestion {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionRequest): Promise<void> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.value !== authorId) {
      throw new Error('Forbidden.')
    }

    await this.questionsRepository.delete(question)
  }
}
