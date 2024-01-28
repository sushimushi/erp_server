import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductTaxGroup, ProductTaxGroupRelations} from '../models';

export class ProductTaxGroupRepository extends DefaultCrudRepository<
  ProductTaxGroup,
  typeof ProductTaxGroup.prototype.productId,
  ProductTaxGroupRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(ProductTaxGroup, dataSource);
  }
}
