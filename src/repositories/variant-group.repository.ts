import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {VariantGroup, VariantGroupRelations} from '../models';

export class VariantGroupRepository extends DefaultCrudRepository<
  VariantGroup,
  typeof VariantGroup.prototype.variantGroupId,
  VariantGroupRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(VariantGroup, dataSource);
  }
}
