import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {SellingPreferences, SellingPreferencesRelations} from '../models';

export class SellingPreferencesRepository extends DefaultCrudRepository<
  SellingPreferences,
  typeof SellingPreferences.prototype.sellingPreferenceId,
  SellingPreferencesRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(SellingPreferences, dataSource);
  }
}
