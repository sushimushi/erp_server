import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ItemGroup, ItemGroupRelations} from '../models';

export class ItemGroupRepository extends DefaultCrudRepository<
  ItemGroup,
  typeof ItemGroup.prototype.itemGroupId,
  ItemGroupRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(ItemGroup, dataSource);
  }
}
