import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductDiscount, ProductDiscountRelations} from '../models';

export class ProductDiscountRepository extends DefaultCrudRepository<
  ProductDiscount,
  typeof ProductDiscount.prototype.productId,
  ProductDiscountRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(ProductDiscount, dataSource);
  }
}
