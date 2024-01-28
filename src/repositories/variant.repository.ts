import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Variant, VariantRelations} from '../models';

export class VariantRepository extends DefaultCrudRepository<
  Variant,
  typeof Variant.prototype.variantId,
  VariantRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Variant, dataSource);
  }
}
