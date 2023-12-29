import { DeleteAnswerComment } from './delete-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'tests/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from 'tests/factories/make-answer-comment'

let sut: DeleteAnswerComment
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerComment(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment()
    await inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      authorId: answerComment.authorId.value,
      answerCommentId: answerComment.id.value,
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment()
    await inMemoryAnswerCommentsRepository.create(answerComment)

    const promise = sut.execute({
      authorId: 'another_user_id',
      answerCommentId: answerComment.id.value,
    })

    await expect(promise).rejects.toThrowError()
    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(1)
  })
})
