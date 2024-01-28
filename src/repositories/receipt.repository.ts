import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Receipt, ReceiptRelations} from '../models';

export class ReceiptRepository extends DefaultCrudRepository<
  Receipt,
  typeof Receipt.prototype.receiptId,
  ReceiptRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Receipt, dataSource);
  }
}
