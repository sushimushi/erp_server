import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductPriceBook, ProductPriceBookRelations, Account} from '../models';
import {AccountRepository} from './account.repository';

export class ProductPriceBookRepository extends DefaultCrudRepository<
  ProductPriceBook,
  typeof ProductPriceBook.prototype.priceBookId,
  ProductPriceBookRelations
> {

  public readonly account: BelongsToAccessor<Account, typeof ProductPriceBook.prototype.priceBookId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
  ) {
    super(ProductPriceBook, dataSource);
    this.account = this.createBelongsToAccessorFor('account', accountRepositoryGetter,);
    this.registerInclusionResolver('account', this.account.inclusionResolver);
  }
}
