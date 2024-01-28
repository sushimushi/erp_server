import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductCategory, ProductCategoryRelations} from '../models';

export class ProductCategoryRepository extends DefaultCrudRepository<
  ProductCategory,
  typeof ProductCategory.prototype.productId,
  ProductCategoryRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(ProductCategory, dataSource);
  }
}
