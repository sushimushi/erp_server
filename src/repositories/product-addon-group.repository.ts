import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductAddonGroup, ProductAddonGroupRelations} from '../models';

export class ProductAddonGroupRepository extends DefaultCrudRepository<
  ProductAddonGroup,
  typeof ProductAddonGroup.prototype.productId,
  ProductAddonGroupRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(ProductAddonGroup, dataSource);
  }
}
