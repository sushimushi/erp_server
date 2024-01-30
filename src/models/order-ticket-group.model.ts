import {Model, model, property, belongsTo} from '@loopback/repository';
import {Category} from './category.model';

@model()
export class OrderTicketGroup extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  orderTicketGroupId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  accountId?: string;

  @belongsTo(() => Category)
  categoryId: string;

  constructor(data?: Partial<OrderTicketGroup>) {
    super(data);
  }
}

export interface OrderTicketGroupRelations {
  // describe navigational properties here
}

export type OrderTicketGroupWithRelations = OrderTicketGroup & OrderTicketGroupRelations;
