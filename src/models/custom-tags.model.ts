import {Entity, model, property} from '@loopback/repository';

@model()
export class CustomTags extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  customTagsId?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  selectAColourToHighlightThisTag?: string;

  @property({
    type: 'boolean',
  })
  printThisFieldOnReceipts?: boolean;

  @property({
    type: 'string',
  })
  accountId: string;


  constructor(data?: Partial<CustomTags>) {
    super(data);
  }
}

export interface CustomTagsRelations {
  // describe navigational properties here
}

export type CustomTagsWithRelations = CustomTags & CustomTagsRelations;
