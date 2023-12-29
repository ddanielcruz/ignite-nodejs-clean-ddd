import {
  PaginationParams,
  DEFAULT_PAGE_SIZE,
} from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments.repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(question: QuestionComment): Promise<void> {
    this.items.push(question)
  }

  async delete(question: QuestionComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === question.id)
    this.items.splice(index, 1)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    return this.items.find((item) => item.id.value === id) || null
  }

  async findManyByQuestionId(
    questionId: string,
    options: PaginationParams,
  ): Promise<QuestionComment[]> {
    const offset = (options.page - 1) * DEFAULT_PAGE_SIZE
    return this.items
      .filter((item) => item.questionId.value === questionId)
      .slice(offset, offset + DEFAULT_PAGE_SIZE)
  }
}
