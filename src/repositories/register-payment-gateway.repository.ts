import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {RegisterPaymentGateway, RegisterPaymentGatewayRelations} from '../models';

export class RegisterPaymentGatewayRepository extends DefaultCrudRepository<
  RegisterPaymentGateway,
  typeof RegisterPaymentGateway.prototype.registerId,
  RegisterPaymentGatewayRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(RegisterPaymentGateway, dataSource);
  }
}
