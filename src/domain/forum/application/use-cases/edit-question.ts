import { Either, left, right } from '@/core/either'

import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'

interface EditQuestionRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentIds: string[]
}

type EditQuestionResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { question: Question }
>

export class EditQuestion {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentIds,
  }: EditQuestionRequest): Promise<EditQuestionResponse> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.value !== authorId) {
      return left(new NotAllowedError())
    }

    // Assign the current attachments to the question
    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId)
    question.attachments = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    question.title = title
    question.content = content

    // Update the question attachments, creating new and removed attachment lists
    question.attachments.update(
      attachmentIds.map((id) =>
        QuestionAttachment.create({
          questionId: question.id,
          attachmentId: new UniqueEntityId(id),
        }),
      ),
    )

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
