import {Entity, model, property} from '@loopback/repository';

@model()
export class ItemGroup extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  itemGroupId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  uniqueItemIds: string[];

  @property({
    type: 'string',
  })
  accountId: string;


  constructor(data?: Partial<ItemGroup>) {
    super(data);
  }
}

export interface ItemGroupRelations {
  // describe navigational properties here
}

export type ItemGroupWithRelations = ItemGroup & ItemGroupRelations;
