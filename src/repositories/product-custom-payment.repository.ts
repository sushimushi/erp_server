import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductCustomPayment, ProductCustomPaymentRelations} from '../models';

export class ProductCustomPaymentRepository extends DefaultCrudRepository<
  ProductCustomPayment,
  typeof ProductCustomPayment.prototype.id,
  ProductCustomPaymentRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(ProductCustomPayment, dataSource);
  }
}
