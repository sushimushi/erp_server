import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {AccountPaymentGateway, AccountPaymentGatewayRelations} from '../models';

export class AccountPaymentGatewayRepository extends DefaultCrudRepository<
  AccountPaymentGateway,
  typeof AccountPaymentGateway.prototype.accountId,
  AccountPaymentGatewayRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(AccountPaymentGateway, dataSource);
  }
}
