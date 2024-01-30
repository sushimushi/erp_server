import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {SellingPreferences, SellingPreferencesRelations, Account} from '../models';
import {AccountRepository} from './account.repository';

export class SellingPreferencesRepository extends DefaultCrudRepository<
  SellingPreferences,
  typeof SellingPreferences.prototype.sellingPreferenceId,
  SellingPreferencesRelations
> {

  public readonly account: BelongsToAccessor<Account, typeof SellingPreferences.prototype.sellingPreferenceId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
  ) {
    super(SellingPreferences, dataSource);
    this.account = this.createBelongsToAccessorFor('account', accountRepositoryGetter,);
    this.registerInclusionResolver('account', this.account.inclusionResolver);
  }
}
