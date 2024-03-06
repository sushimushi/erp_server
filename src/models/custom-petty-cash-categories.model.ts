import {Entity, model, property} from '@loopback/repository';

@model()
export class CustomPettyCashCategories extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  customPettyCashCategoriesId?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  accountId: string;


  constructor(data?: Partial<CustomPettyCashCategories>) {
    super(data);
  }
}

export interface CustomPettyCashCategoriesRelations {
  // describe navigational properties here
}

export type CustomPettyCashCategoriesWithRelations = CustomPettyCashCategories & CustomPettyCashCategoriesRelations;
