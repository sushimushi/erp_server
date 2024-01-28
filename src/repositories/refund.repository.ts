import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Refund, RefundRelations} from '../models';

export class RefundRepository extends DefaultCrudRepository<
  Refund,
  typeof Refund.prototype.refundId,
  RefundRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Refund, dataSource);
  }
}
