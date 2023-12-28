import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface GetQuestionBySlugRequest {
  slug: string
}

interface GetQuestionBySlugResponse {
  question: Question
}

export class GetQuestionBySlug {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute(
    request: GetQuestionBySlugRequest,
  ): Promise<GetQuestionBySlugResponse> {
    const question = await this.questionsRepository.findBySlug(request.slug)
    if (!question) {
      throw new Error('Question not found.')
    }

    return { question }
  }
}
