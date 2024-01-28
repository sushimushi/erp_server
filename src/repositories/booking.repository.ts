import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Booking, BookingRelations} from '../models';

export class BookingRepository extends DefaultCrudRepository<
  Booking,
  typeof Booking.prototype.bookingId,
  BookingRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Booking, dataSource);
  }
}
