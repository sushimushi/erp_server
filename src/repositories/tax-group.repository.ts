import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TaxGroup, TaxGroupRelations} from '../models';

export class TaxGroupRepository extends DefaultCrudRepository<
  TaxGroup,
  typeof TaxGroup.prototype.taxGroupId,
  TaxGroupRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(TaxGroup, dataSource);
  }
}
