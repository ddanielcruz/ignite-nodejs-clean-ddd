import { QuestionCommentsRepository } from '../repositories/question-comments.repository'

interface DeleteQuestionCommentRequest {
  authorId: string
  questionCommentId: string
}

export class DeleteQuestionComment {
  constructor(
    private readonly questionsCommentRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId: commentId,
  }: DeleteQuestionCommentRequest): Promise<void> {
    const comment = await this.questionsCommentRepository.findById(commentId)
    if (!comment) {
      throw new Error('Question comment not found.')
    }

    if (comment.authorId.value !== authorId) {
      throw new Error('Forbidden.')
    }

    await this.questionsCommentRepository.delete(comment)
  }
}
