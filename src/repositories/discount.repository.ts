import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Discount, DiscountRelations} from '../models';

export class DiscountRepository extends DefaultCrudRepository<
  Discount,
  typeof Discount.prototype.discountId,
  DiscountRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Discount, dataSource);
  }
}
