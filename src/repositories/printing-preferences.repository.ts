import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {PrintingPreferences, PrintingPreferencesRelations} from '../models';

export class PrintingPreferencesRepository extends DefaultCrudRepository<
  PrintingPreferences,
  typeof PrintingPreferences.prototype.printingPreferenceId,
  PrintingPreferencesRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(PrintingPreferences, dataSource);
  }
}
