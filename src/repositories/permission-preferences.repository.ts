import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {PermissionPreferences, PermissionPreferencesRelations, Account} from '../models';
import {AccountRepository} from './account.repository';

export class PermissionPreferencesRepository extends DefaultCrudRepository<
  PermissionPreferences,
  typeof PermissionPreferences.prototype.permissionPreferenceId,
  PermissionPreferencesRelations
> {

  public readonly account: BelongsToAccessor<Account, typeof PermissionPreferences.prototype.permissionPreferenceId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
  ) {
    super(PermissionPreferences, dataSource);
    this.account = this.createBelongsToAccessorFor('account', accountRepositoryGetter,);
    this.registerInclusionResolver('account', this.account.inclusionResolver);
  }
}
