import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductVariant, ProductVariantRelations} from '../models';

export class ProductVariantRepository extends DefaultCrudRepository<
  ProductVariant,
  typeof ProductVariant.prototype.variantId,
  ProductVariantRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(ProductVariant, dataSource);
  }
}
