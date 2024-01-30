import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Booking, BookingRelations, Receipt} from '../models';
import {ReceiptRepository} from './receipt.repository';

export class BookingRepository extends DefaultCrudRepository<
  Booking,
  typeof Booking.prototype.bookingId,
  BookingRelations
> {

  public readonly receipt: BelongsToAccessor<Receipt, typeof Booking.prototype.bookingId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('ReceiptRepository') protected receiptRepositoryGetter: Getter<ReceiptRepository>,
  ) {
    super(Booking, dataSource);
    this.receipt = this.createBelongsToAccessorFor('receipt', receiptRepositoryGetter,);
    this.registerInclusionResolver('receipt', this.receipt.inclusionResolver);
  }
}
