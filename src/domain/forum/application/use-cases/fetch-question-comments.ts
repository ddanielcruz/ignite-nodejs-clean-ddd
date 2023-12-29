import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments.repository'

interface FetchQuestionCommentsRequest {
  questionId: string
  page: number
}

interface FetchQuestionCommentsResponse {
  comments: QuestionComment[]
}

export class FetchQuestionComments {
  constructor(
    private readonly commentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsResponse> {
    const comments = await this.commentsRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return { comments }
  }
}
