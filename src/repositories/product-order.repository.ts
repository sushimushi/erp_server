import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductOrder, ProductOrderRelations} from '../models';

export class ProductOrderRepository extends DefaultCrudRepository<
  ProductOrder,
  typeof ProductOrder.prototype.productId,
  ProductOrderRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(ProductOrder, dataSource);
  }
}
