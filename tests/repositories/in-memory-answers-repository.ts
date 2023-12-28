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
}
