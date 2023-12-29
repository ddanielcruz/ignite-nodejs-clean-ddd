import { DeleteQuestionComment } from './delete-question-comment'
import { InMemoryQuestionCommentsRepository } from 'tests/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'tests/factories/make-question-comment'
import { NotAllowedError } from './errors/not-allowed-error'

let sut: DeleteQuestionComment
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionComment(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment()
    await inMemoryQuestionCommentsRepository.create(questionComment)

    const result = await sut.execute({
      authorId: questionComment.authorId.value,
      questionCommentId: questionComment.id.value,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment()
    await inMemoryQuestionCommentsRepository.create(questionComment)

    const result = await sut.execute({
      authorId: 'another_user_id',
      questionCommentId: questionComment.id.value,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1)
  })
})
