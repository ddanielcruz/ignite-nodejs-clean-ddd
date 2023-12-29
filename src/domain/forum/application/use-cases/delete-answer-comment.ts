import { AnswerCommentsRepository } from '../repositories/answer-comments.repository'

interface DeleteAnswerCommentRequest {
  authorId: string
  answerCommentId: string
}

export class DeleteAnswerComment {
  constructor(
    private readonly answersCommentRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerCommentId: commentId,
  }: DeleteAnswerCommentRequest): Promise<void> {
    const comment = await this.answersCommentRepository.findById(commentId)
    if (!comment) {
      throw new Error('Answer comment not found.')
    }

    if (comment.authorId.value !== authorId) {
      throw new Error('Forbidden.')
    }

    await this.answersCommentRepository.delete(comment)
  }
}
