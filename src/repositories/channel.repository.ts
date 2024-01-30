import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Channel, ChannelRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class ChannelRepository extends DefaultCrudRepository<
  Channel,
  typeof Channel.prototype.channelId,
  ChannelRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Channel.prototype.channelId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Channel, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
