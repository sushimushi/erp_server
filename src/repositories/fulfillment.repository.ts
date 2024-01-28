import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Fulfillment, FulfillmentRelations} from '../models';

export class FulfillmentRepository extends DefaultCrudRepository<
  Fulfillment,
  typeof Fulfillment.prototype.fulfillmentId,
  FulfillmentRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Fulfillment, dataSource);
  }
}
