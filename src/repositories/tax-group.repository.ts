import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TaxGroup, TaxGroupRelations, Tax, TaxGroupTax} from '../models';
import {TaxGroupTaxRepository} from './tax-group-tax.repository';
import {TaxRepository} from './tax.repository';

export class TaxGroupRepository extends DefaultCrudRepository<
  TaxGroup,
  typeof TaxGroup.prototype.taxGroupId,
  TaxGroupRelations
> {

  public readonly taxes: HasManyThroughRepositoryFactory<Tax, typeof Tax.prototype.taxId,
          TaxGroupTax,
          typeof TaxGroup.prototype.taxGroupId
        >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('TaxGroupTaxRepository') protected taxGroupTaxRepositoryGetter: Getter<TaxGroupTaxRepository>, @repository.getter('TaxRepository') protected taxRepositoryGetter: Getter<TaxRepository>,
  ) {
    super(TaxGroup, dataSource);
    this.taxes = this.createHasManyThroughRepositoryFactoryFor('taxes', taxRepositoryGetter, taxGroupTaxRepositoryGetter,);
    this.registerInclusionResolver('taxes', this.taxes.inclusionResolver);
  }
}
