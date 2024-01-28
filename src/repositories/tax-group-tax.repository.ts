import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TaxGroupTax, TaxGroupTaxRelations} from '../models';

export class TaxGroupTaxRepository extends DefaultCrudRepository<
  TaxGroupTax,
  typeof TaxGroupTax.prototype.taxGroupId,
  TaxGroupTaxRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(TaxGroupTax, dataSource);
  }
}
