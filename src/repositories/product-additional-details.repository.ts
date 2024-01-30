import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductAdditionalDetails, ProductAdditionalDetailsRelations} from '../models';

export class ProductAdditionalDetailsRepository extends DefaultCrudRepository<
  ProductAdditionalDetails,
  typeof ProductAdditionalDetails.prototype.id,
  ProductAdditionalDetailsRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(ProductAdditionalDetails, dataSource);
  }
}
