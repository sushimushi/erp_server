import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {CustomPayment, CustomPaymentRelations} from '../models';

export class CustomPaymentRepository extends DefaultCrudRepository<
  CustomPayment,
  typeof CustomPayment.prototype.customPaymentId,
  CustomPaymentRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(CustomPayment, dataSource);
  }
}
