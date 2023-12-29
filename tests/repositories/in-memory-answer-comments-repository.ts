import {
  DEFAULT_PAGE_SIZE,
  PaginationParams,
} from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments.repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answer: AnswerComment): Promise<void> {
    this.items.push(answer)
  }

  async delete(answer: AnswerComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(index, 1)
  }

  async findById(id: string): Promise<AnswerComment | null> {
    return this.items.find((item) => item.id.value === id) || null
  }

  async findManyByAnswerId(
    answerId: string,
    options: PaginationParams,
  ): Promise<AnswerComment[]> {
    const offset = (options.page - 1) * DEFAULT_PAGE_SIZE
    return this.items
      .filter((item) => item.answerId.value === answerId)
      .slice(offset, offset + DEFAULT_PAGE_SIZE)
  }
}
