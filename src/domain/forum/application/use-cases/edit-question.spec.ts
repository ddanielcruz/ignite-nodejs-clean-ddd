import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

import { makeQuestion } from 'tests/factories/make-question'
import { EditQuestion } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryQuestionAttachmentsRepository } from 'tests/repositories/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'tests/factories/make-question-attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let sut: EditQuestion
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    sut = new EditQuestion(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttachmentsRepository,
    )
  })

  it('should be able to edit a question', async () => {
    const questionToEdit = makeQuestion()

    await inMemoryQuestionsRepository.create(questionToEdit)
    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: questionToEdit.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeQuestionAttachment({
        questionId: questionToEdit.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    const result = await sut.execute({
      authorId: questionToEdit.authorId.value,
      questionId: questionToEdit.id.value,
      title: 'new title',
      content: 'new body',
      attachmentIds: ['1', '3'],
    })

    assert(result.isRight())
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'new title',
      content: 'new body',
    })
    expect(result.value.question.attachments.getItems()).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
      ]),
    )
  })

  it('should not be able to edit a question from another user', async () => {
    const questionToEdit = makeQuestion()
    await inMemoryQuestionsRepository.create(questionToEdit)
    const result = await sut.execute({
      authorId: 'another_user',
      questionId: questionToEdit.id.value,
      title: 'new title',
      content: 'new body',
      attachmentIds: [],
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryQuestionsRepository.items[0]).not.toMatchObject({
      title: 'new title',
      content: 'new body',
    })
  })
})
