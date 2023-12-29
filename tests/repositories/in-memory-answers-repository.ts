import {
  DEFAULT_PAGE_SIZE,
  PaginationParams,
} from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    this.items = this.items.filter((item) => item.id.value !== answer.id.value)
  }

  async findById(id: string): Promise<Answer | null> {
    return this.items.find((answer) => answer.id.value === id) ?? null
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const offset = (page - 1) * DEFAULT_PAGE_SIZE
    return this.items
      .filter((answer) => answer.questionId.value === questionId)
      .slice(offset, offset + DEFAULT_PAGE_SIZE)
  }

  async save(answer: Answer): Promise<void> {
    this.items = this.items.map((item) =>
      item.id.value === answer.id.value ? answer : item,
    )
  }
}
