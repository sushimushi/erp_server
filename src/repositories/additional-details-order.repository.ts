import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {AdditionalDetailsOrder, AdditionalDetailsOrderRelations} from '../models';

export class AdditionalDetailsOrderRepository extends DefaultCrudRepository<
  AdditionalDetailsOrder,
  typeof AdditionalDetailsOrder.prototype.id,
  AdditionalDetailsOrderRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(AdditionalDetailsOrder, dataSource);
  }
}
