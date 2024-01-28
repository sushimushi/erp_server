import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {PermissionPreferences, PermissionPreferencesRelations} from '../models';

export class PermissionPreferencesRepository extends DefaultCrudRepository<
  PermissionPreferences,
  typeof PermissionPreferences.prototype.permissionPreferenceId,
  PermissionPreferencesRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(PermissionPreferences, dataSource);
  }
}
