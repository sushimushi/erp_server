import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Order, OrderRelations, OrderItem, TaxGroup, OrderTaxGroup, Discount, OrderDiscount, Payment, Refund, Booking, Fulfillment, PushNotification, WebhookTable} from '../models';
import {OrderItemRepository} from './order-item.repository';
import {OrderTaxGroupRepository} from './order-tax-group.repository';
import {TaxGroupRepository} from './tax-group.repository';
import {OrderDiscountRepository} from './order-discount.repository';
import {DiscountRepository} from './discount.repository';
import {PaymentRepository} from './payment.repository';
import {RefundRepository} from './refund.repository';
import {BookingRepository} from './booking.repository';
import {FulfillmentRepository} from './fulfillment.repository';
import {PushNotificationRepository} from './push-notification.repository';
import {WebhookTableRepository} from './webhook-table.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.orderId,
  OrderRelations
> {

  public readonly orderItems: HasManyRepositoryFactory<OrderItem, typeof Order.prototype.orderId>;

  public readonly orderTaxGroup: HasManyThroughRepositoryFactory<TaxGroup, typeof TaxGroup.prototype.taxGroupId,
          OrderTaxGroup,
          typeof Order.prototype.orderId
        >;

  public readonly orderDiscount: HasManyThroughRepositoryFactory<Discount, typeof Discount.prototype.discountId,
          OrderDiscount,
          typeof Order.prototype.orderId
        >;

  public readonly orderPayment: HasManyRepositoryFactory<Payment, typeof Order.prototype.orderId>;

  public readonly refunds: HasManyRepositoryFactory<Refund, typeof Order.prototype.orderId>;

  public readonly booking: HasOneRepositoryFactory<Booking, typeof Order.prototype.orderId>;

  public readonly fulfillment: HasOneRepositoryFactory<Fulfillment, typeof Order.prototype.orderId>;

  public readonly pushNotifications: HasManyRepositoryFactory<PushNotification, typeof Order.prototype.orderId>;

  public readonly webhookTables: HasManyRepositoryFactory<WebhookTable, typeof Order.prototype.orderId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('OrderItemRepository') protected orderItemRepositoryGetter: Getter<OrderItemRepository>, @repository.getter('OrderTaxGroupRepository') protected orderTaxGroupRepositoryGetter: Getter<OrderTaxGroupRepository>, @repository.getter('TaxGroupRepository') protected taxGroupRepositoryGetter: Getter<TaxGroupRepository>, @repository.getter('OrderDiscountRepository') protected orderDiscountRepositoryGetter: Getter<OrderDiscountRepository>, @repository.getter('DiscountRepository') protected discountRepositoryGetter: Getter<DiscountRepository>, @repository.getter('PaymentRepository') protected paymentRepositoryGetter: Getter<PaymentRepository>, @repository.getter('RefundRepository') protected refundRepositoryGetter: Getter<RefundRepository>, @repository.getter('BookingRepository') protected bookingRepositoryGetter: Getter<BookingRepository>, @repository.getter('FulfillmentRepository') protected fulfillmentRepositoryGetter: Getter<FulfillmentRepository>, @repository.getter('PushNotificationRepository') protected pushNotificationRepositoryGetter: Getter<PushNotificationRepository>, @repository.getter('WebhookTableRepository') protected webhookTableRepositoryGetter: Getter<WebhookTableRepository>,
  ) {
    super(Order, dataSource);
    this.webhookTables = this.createHasManyRepositoryFactoryFor('webhookTables', webhookTableRepositoryGetter,);
    this.registerInclusionResolver('webhookTables', this.webhookTables.inclusionResolver);
    this.pushNotifications = this.createHasManyRepositoryFactoryFor('pushNotifications', pushNotificationRepositoryGetter,);
    this.registerInclusionResolver('pushNotifications', this.pushNotifications.inclusionResolver);
    this.fulfillment = this.createHasOneRepositoryFactoryFor('fulfillment', fulfillmentRepositoryGetter);
    this.registerInclusionResolver('fulfillment', this.fulfillment.inclusionResolver);
    this.booking = this.createHasOneRepositoryFactoryFor('booking', bookingRepositoryGetter);
    this.registerInclusionResolver('booking', this.booking.inclusionResolver);
    this.refunds = this.createHasManyRepositoryFactoryFor('refunds', refundRepositoryGetter,);
    this.registerInclusionResolver('refunds', this.refunds.inclusionResolver);
    this.orderPayment = this.createHasManyRepositoryFactoryFor('orderPayment', paymentRepositoryGetter,);
    this.registerInclusionResolver('orderPayment', this.orderPayment.inclusionResolver);
    this.orderDiscount = this.createHasManyThroughRepositoryFactoryFor('orderDiscount', discountRepositoryGetter, orderDiscountRepositoryGetter,);
    this.registerInclusionResolver('orderDiscount', this.orderDiscount.inclusionResolver);
    this.orderTaxGroup = this.createHasManyThroughRepositoryFactoryFor('orderTaxGroup', taxGroupRepositoryGetter, orderTaxGroupRepositoryGetter,);
    this.registerInclusionResolver('orderTaxGroup', this.orderTaxGroup.inclusionResolver);
    this.orderItems = this.createHasManyRepositoryFactoryFor('orderItems', orderItemRepositoryGetter,);
    this.registerInclusionResolver('orderItems', this.orderItems.inclusionResolver);
  }
}
