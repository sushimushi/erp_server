import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Plan, PlanRelations, Account} from '../models';
import {AccountRepository} from './account.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.planId,
  PlanRelations
> {

  public readonly account: BelongsToAccessor<Account, typeof Plan.prototype.planId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
  ) {
    super(Plan, dataSource);
    this.account = this.createBelongsToAccessorFor('account', accountRepositoryGetter,);
    this.registerInclusionResolver('account', this.account.inclusionResolver);
  }
}
