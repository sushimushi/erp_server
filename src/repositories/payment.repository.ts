import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Payment, PaymentRelations} from '../models';

export class PaymentRepository extends DefaultCrudRepository<
  Payment,
  typeof Payment.prototype.paymentId,
  PaymentRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Payment, dataSource);
  }
}
