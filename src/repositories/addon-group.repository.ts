import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {AddonGroup, AddonGroupRelations} from '../models';

export class AddonGroupRepository extends DefaultCrudRepository<
  AddonGroup,
  typeof AddonGroup.prototype.addonGroupId,
  AddonGroupRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(AddonGroup, dataSource);
  }
}
