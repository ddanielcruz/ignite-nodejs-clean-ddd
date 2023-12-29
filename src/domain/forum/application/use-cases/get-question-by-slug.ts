import { Either, left, right } from '@/core/either'

import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetQuestionBySlugRequest {
  slug: string
}

type GetQuestionBySlugResponse = Either<
  ResourceNotFoundError,
  { question: Question }
>

export class GetQuestionBySlug {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute(
    request: GetQuestionBySlugRequest,
  ): Promise<GetQuestionBySlugResponse> {
    const question = await this.questionsRepository.findBySlug(request.slug)
    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({ question })
  }
}
