import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {VariantGroupVariant, VariantGroupVariantRelations} from '../models';

export class VariantGroupVariantRepository extends DefaultCrudRepository<
  VariantGroupVariant,
  typeof VariantGroupVariant.prototype.variantGroupId,
  VariantGroupVariantRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(VariantGroupVariant, dataSource);
  }
}
