import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {PrintingPreferences, PrintingPreferencesRelations, Account} from '../models';
import {AccountRepository} from './account.repository';

export class PrintingPreferencesRepository extends DefaultCrudRepository<
  PrintingPreferences,
  typeof PrintingPreferences.prototype.printingPreferenceId,
  PrintingPreferencesRelations
> {

  public readonly account: BelongsToAccessor<Account, typeof PrintingPreferences.prototype.printingPreferenceId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
  ) {
    super(PrintingPreferences, dataSource);
    this.account = this.createBelongsToAccessorFor('account', accountRepositoryGetter,);
    this.registerInclusionResolver('account', this.account.inclusionResolver);
  }
}
