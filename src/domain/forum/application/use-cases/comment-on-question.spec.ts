import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { InMemoryQuestionCommentsRepository } from 'tests/repositories/in-memory-question-comments-repository'
import { makeQuestion } from 'tests/factories/make-question'

import { CommentOnQuestion } from './comment-on-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestion

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnQuestion(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on a question', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({
      questionId: question.id.value,
      authorId: 'any_author_id',
      content: 'any_content',
    })

    assert(result.isRight())
    expect(result.value.comment.id).toBeTruthy()
    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1)
  })
})
