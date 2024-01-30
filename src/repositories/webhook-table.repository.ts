import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {WebhookTable, WebhookTableRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class WebhookTableRepository extends DefaultCrudRepository<
  WebhookTable,
  typeof WebhookTable.prototype.webhookId,
  WebhookTableRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof WebhookTable.prototype.webhookId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(WebhookTable, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
