import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {OrderTaxGroup, OrderTaxGroupRelations} from '../models';

export class OrderTaxGroupRepository extends DefaultCrudRepository<
  OrderTaxGroup,
  typeof OrderTaxGroup.prototype.orderId,
  OrderTaxGroupRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(OrderTaxGroup, dataSource);
  }
}
