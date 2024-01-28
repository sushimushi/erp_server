import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {PaymentGateway, PaymentGatewayRelations} from '../models';

export class PaymentGatewayRepository extends DefaultCrudRepository<
  PaymentGateway,
  typeof PaymentGateway.prototype.gatewayId,
  PaymentGatewayRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(PaymentGateway, dataSource);
  }
}
