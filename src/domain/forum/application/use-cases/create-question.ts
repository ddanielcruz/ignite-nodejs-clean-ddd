import { Question } from '@/domain/forum/enterprise/entities/question'

import { QuestionsRepository } from '../repositories/questions-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface CreateQuestionRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionResponse {
  question: Question
}

export class CreateQuestion {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute(
    request: CreateQuestionRequest,
  ): Promise<CreateQuestionResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(request.authorId),
      title: request.title,
      content: request.content,
    })

    await this.questionsRepository.create(question)

    return { question }
  }
}
