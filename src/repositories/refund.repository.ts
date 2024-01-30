import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Refund, RefundRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class RefundRepository extends DefaultCrudRepository<
  Refund,
  typeof Refund.prototype.refundId,
  RefundRelations
> {

  public readonly order: BelongsToAccessor<Order, typeof Refund.prototype.refundId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Refund, dataSource);
    this.order = this.createBelongsToAccessorFor('order', orderRepositoryGetter,);
    this.registerInclusionResolver('order', this.order.inclusionResolver);
  }
}
