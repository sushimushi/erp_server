import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ComboGroup, ComboGroupRelations} from '../models';

export class ComboGroupRepository extends DefaultCrudRepository<
  ComboGroup,
  typeof ComboGroup.prototype.comboGroupId,
  ComboGroupRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(ComboGroup, dataSource);
  }
}
