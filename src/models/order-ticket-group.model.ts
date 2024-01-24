import {Model, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<OrderTicketGroup>) {
    super(data);
  }
}

export interface OrderTicketGroupRelations {
  // describe navigational properties here
}

export type OrderTicketGroupWithRelations = OrderTicketGroup & OrderTicketGroupRelations;
