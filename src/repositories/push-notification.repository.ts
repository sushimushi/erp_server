import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {PushNotification, PushNotificationRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class PushNotificationRepository extends DefaultCrudRepository<
  PushNotification,
  typeof PushNotification.prototype.notificationId,
  PushNotificationRelations
> {

  public readonly order: BelongsToAccessor<Order, typeof PushNotification.prototype.notificationId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(PushNotification, dataSource);
    this.order = this.createBelongsToAccessorFor('order', orderRepositoryGetter,);
    this.registerInclusionResolver('order', this.order.inclusionResolver);
  }
}
