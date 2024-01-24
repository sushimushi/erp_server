import {Model, model, property} from '@loopback/repository';

@model()
export class OrderItem extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  orderItemId?: string;

  @property({
    type: 'string',
    required: true,
  })
  orderId: string;

  @property({
    type: 'string',
    required: true,
  })
  productId: string;

  @property({
    type: 'string',
    required: true,
  })
  quantity: string;

  @property({
    type: 'string',
    required: true,
  })
  unitOfMeasure: string;

  @property({
    type: 'number',
    required: true,
  })
  totalPriceExcludingDiscountAndTax: number;

  @property({
    type: 'string',
  })
  discountId?: string;

  @property({
    type: 'string',
  })
  taxGroupId?: string;

  @property({
    type: 'string',
    required: true,
  })
  categoryId: string;

  @property({
    type: 'string',
    required: true,
  })
  displayName: string;

  @property({
    type: 'string',
  })
  uniqueItemId?: string;

  @property({
    type: 'number',
    required: true,
  })
  priceExcludingDiscountAndTax: number;

  @property({
    type: 'array',
    itemType: 'string',
  })
  variantIds?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  addonIds?: string[];

  @property({
    type: 'object',
  })
  comboItemDetails?: object;


  constructor(data?: Partial<OrderItem>) {
    super(data);
  }
}

export interface OrderItemRelations {
  // describe navigational properties here
}

export type OrderItemWithRelations = OrderItem & OrderItemRelations;
