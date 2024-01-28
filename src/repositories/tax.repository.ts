import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Tax, TaxRelations} from '../models';

export class TaxRepository extends DefaultCrudRepository<
  Tax,
  typeof Tax.prototype.taxId,
  TaxRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Tax, dataSource);
  }
}
