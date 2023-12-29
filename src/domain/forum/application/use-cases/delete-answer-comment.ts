import { Either, left, right } from '@/core/either'

import { AnswerCommentsRepository } from '../repositories/answer-comments.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteAnswerCommentRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  void
>

export class DeleteAnswerComment {
  constructor(
    private readonly answersCommentRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerCommentId: commentId,
  }: DeleteAnswerCommentRequest): Promise<DeleteAnswerCommentResponse> {
    const comment = await this.answersCommentRepository.findById(commentId)
    if (!comment) {
      return left(new ResourceNotFoundError())
    }

    if (comment.authorId.value !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answersCommentRepository.delete(comment)

    return right(undefined)
  }
}
