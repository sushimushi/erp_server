import {Entity, model, property} from '@loopback/repository';

@model()
export class CustomField extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  customFieldId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  fieldType: string;

  @property({
    type: 'boolean',
  })
  isPrintOnReceipts?: boolean;

  @property({
    type: 'string',
  })
  tagColor?: string;

  @property({
    type: 'string',
  })
  accountId?: string;


  constructor(data?: Partial<CustomField>) {
    super(data);
  }
}

export interface CustomFieldRelations {
  // describe navigational properties here
}

export type CustomFieldWithRelations = CustomField & CustomFieldRelations;
