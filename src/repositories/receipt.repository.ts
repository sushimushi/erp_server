import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Receipt, ReceiptRelations, Refund, Booking, Fulfillment} from '../models';
import {RefundRepository} from './refund.repository';
import {BookingRepository} from './booking.repository';
import {FulfillmentRepository} from './fulfillment.repository';

export class ReceiptRepository extends DefaultCrudRepository<
  Receipt,
  typeof Receipt.prototype.receiptId,
  ReceiptRelations
> {

  public readonly refunds: HasManyRepositoryFactory<Refund, typeof Receipt.prototype.receiptId>;

  public readonly booking: BelongsToAccessor<Booking, typeof Receipt.prototype.receiptId>;

  public readonly fulfillment: BelongsToAccessor<Fulfillment, typeof Receipt.prototype.receiptId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('RefundRepository') protected refundRepositoryGetter: Getter<RefundRepository>, @repository.getter('BookingRepository') protected bookingRepositoryGetter: Getter<BookingRepository>, @repository.getter('FulfillmentRepository') protected fulfillmentRepositoryGetter: Getter<FulfillmentRepository>,
  ) {
    super(Receipt, dataSource);
    this.fulfillment = this.createBelongsToAccessorFor('fulfillment', fulfillmentRepositoryGetter,);
    this.registerInclusionResolver('fulfillment', this.fulfillment.inclusionResolver);
    this.booking = this.createBelongsToAccessorFor('booking', bookingRepositoryGetter,);
    this.registerInclusionResolver('booking', this.booking.inclusionResolver);
    this.refunds = this.createHasManyRepositoryFactoryFor('refunds', refundRepositoryGetter,);
    this.registerInclusionResolver('refunds', this.refunds.inclusionResolver);
  }
}
