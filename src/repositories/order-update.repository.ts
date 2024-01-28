import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {OrderUpdate, OrderUpdateRelations} from '../models';

export class OrderUpdateRepository extends DefaultCrudRepository<
  OrderUpdate,
  typeof OrderUpdate.prototype.updateReferenceId,
  OrderUpdateRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(OrderUpdate, dataSource);
  }
}
