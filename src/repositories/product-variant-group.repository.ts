import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductVariantGroup, ProductVariantGroupRelations} from '../models';

export class ProductVariantGroupRepository extends DefaultCrudRepository<
  ProductVariantGroup,
  typeof ProductVariantGroup.prototype.productId,
  ProductVariantGroupRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(ProductVariantGroup, dataSource);
  }
}
