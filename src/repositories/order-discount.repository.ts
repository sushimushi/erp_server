import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {OrderDiscount, OrderDiscountRelations} from '../models';

export class OrderDiscountRepository extends DefaultCrudRepository<
  OrderDiscount,
  typeof OrderDiscount.prototype.orderId,
  OrderDiscountRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(OrderDiscount, dataSource);
  }
}
