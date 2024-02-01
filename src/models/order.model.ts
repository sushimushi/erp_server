import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Booking} from './booking.model';
import {Discount} from './discount.model';
import {Fulfillment} from './fulfillment.model';
import {OrderDiscount} from './order-discount.model';
import {OrderItem} from './order-item.model';
import {OrderTaxGroup} from './order-tax-group.model';
import {Payment} from './payment.model';
import {ProductOrder} from './product-order.model';
import {Product} from './product.model';
import {PushNotification} from './push-notification.model';
import {Refund} from './refund.model';
import {TaxGroup} from './tax-group.model';
import {WebhookTable} from './webhook-table.model';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  orderId?: string;

  @property({
    type: 'object',
  })
  details?: object;

  @property({
    type: 'boolean',
    required: true,
  })
  isRunningOrder: boolean;

  @property({
    type: 'string',
    required: true,
  })
  tableNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  LockType: string;

  @property({
    type: 'string',
  })
  notes?: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  paymentStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  fullfillmentStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  saleType: string;

  @property({
    type: 'string',
    required: true,
  })
  cancelledBy: string;

  @property({
    type: 'date',
    required: true,
  })
  cancelledAt: string;

  @property({
    type: 'string',
  })
  cancellationReason?: string;

  @hasMany(() => OrderItem)
  orderItems: OrderItem[];

  @hasMany(() => TaxGroup, {through: {model: () => OrderTaxGroup}})
  orderTaxGroup: TaxGroup[];

  @hasMany(() => Discount, {through: {model: () => OrderDiscount}})
  orderDiscount: Discount[];

  @hasMany(() => Payment, {keyTo: 'transactedBy'})
  orderPayment: Payment[];

  @hasMany(() => Refund, {keyTo: 'updatedBy'})
  refunds: Refund[];

  @hasOne(() => Booking, {keyTo: 'receiptId'})
  booking: Booking;

  @hasOne(() => Fulfillment, {keyTo: 'receiptId'})
  fulfillment: Fulfillment;

  @hasMany(() => PushNotification)
  pushNotifications: PushNotification[];

  @hasMany(() => WebhookTable)
  webhookTables: WebhookTable[];

  @property({
    type: 'string',
  })
  channelId?: string;

  @hasMany(() => TaxGroup, {through: {model: () => OrderTaxGroup}})
  taxGroups: TaxGroup[];

  @hasMany(() => Product, {through: {model: () => ProductOrder}})
  products: Product[];

  @hasMany(() => WebhookTable)
  orderWebhookTable: WebhookTable[];

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
