import {Entity, model, property} from '@loopback/repository';

@model()
export class CustomAdditionalDetails extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  customAdditionalDetailsId?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'boolean',
  })
  printThisFieldOnReceipts?: boolean;

  @property({
    type: 'string',
  })
  accountId: string;


  constructor(data?: Partial<CustomAdditionalDetails>) {
    super(data);
  }
}

export interface CustomAdditionalDetailsRelations {
  // describe navigational properties here
}

export type CustomAdditionalDetailsWithRelations = CustomAdditionalDetails & CustomAdditionalDetailsRelations;
