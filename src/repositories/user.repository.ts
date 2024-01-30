import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {User, UserRelations, Order, OrderUpdate, Receipt} from '../models';
import {OrderRepository} from './order.repository';
import {OrderUpdateRepository} from './order-update.repository';
import {ReceiptRepository} from './receipt.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.userId,
  UserRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof User.prototype.userId>;

  public readonly cancelledBy: HasManyRepositoryFactory<Order, typeof User.prototype.userId>;

  public readonly orderUpdates: HasManyRepositoryFactory<OrderUpdate, typeof User.prototype.userId>;

  public readonly userReceipt: HasManyRepositoryFactory<Receipt, typeof User.prototype.userId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>, @repository.getter('OrderUpdateRepository') protected orderUpdateRepositoryGetter: Getter<OrderUpdateRepository>, @repository.getter('ReceiptRepository') protected receiptRepositoryGetter: Getter<ReceiptRepository>,
  ) {
    super(User, dataSource);
    this.userReceipt = this.createHasManyRepositoryFactoryFor('userReceipt', receiptRepositoryGetter,);
    this.registerInclusionResolver('userReceipt', this.userReceipt.inclusionResolver);
    this.orderUpdates = this.createHasManyRepositoryFactoryFor('orderUpdates', orderUpdateRepositoryGetter,);
    this.registerInclusionResolver('orderUpdates', this.orderUpdates.inclusionResolver);
    this.cancelledBy = this.createHasManyRepositoryFactoryFor('cancelledBy', orderRepositoryGetter,);
    this.registerInclusionResolver('cancelledBy', this.cancelledBy.inclusionResolver);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
