import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Addon, AddonRelations} from '../models';

export class AddonRepository extends DefaultCrudRepository<
  Addon,
  typeof Addon.prototype.addonId,
  AddonRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Addon, dataSource);
  }
}
