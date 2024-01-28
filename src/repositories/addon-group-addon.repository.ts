import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {AddonGroupAddon, AddonGroupAddonRelations} from '../models';

export class AddonGroupAddonRepository extends DefaultCrudRepository<
  AddonGroupAddon,
  typeof AddonGroupAddon.prototype.addonGroupId,
  AddonGroupAddonRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(AddonGroupAddon, dataSource);
  }
}
