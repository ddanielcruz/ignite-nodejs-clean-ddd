import { Entity } from '@/core/entities/entity'

interface AttachmentAttr {
  title: string
  link: string
}

export class Attachment extends Entity<AttachmentAttr> {
  get title(): string {
    return this.attr.title
  }

  get link(): string {
    return this.attr.link
  }

  static create(attr: AttachmentAttr): Attachment {
    return new Attachment(attr)
  }
}
