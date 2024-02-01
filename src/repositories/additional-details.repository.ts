import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {AdditionalDetails, AdditionalDetailsRelations, Order, AdditionalDetailsOrder} from '../models';
import {AdditionalDetailsOrderRepository} from './additional-details-order.repository';
import {OrderRepository} from './order.repository';

export class AdditionalDetailsRepository extends DefaultCrudRepository<
  AdditionalDetails,
  typeof AdditionalDetails.prototype.additionalDetailId,
  AdditionalDetailsRelations
> {

  // public readonly additionalDetailsOrder: HasManyThroughRepositoryFactory<Order, typeof Order.prototype.orderId,
  //         AdditionalDetailsOrder,
  //         typeof AdditionalDetails.prototype.additionalDetailId
  //       >;

  // public readonly orders: HasManyThroughRepositoryFactory<Order, typeof Order.prototype.orderId,
  //         AdditionalDetailsOrder,
  //         typeof AdditionalDetails.prototype.additionalDetailId
  //       >;

  // public readonly ordersAdditionalDetails: HasManyThroughRepositoryFactory<Order, typeof Order.prototype.orderId,
  //         AdditionalDetailsOrder,
  //         typeof AdditionalDetails.prototype.additionalDetailId
  //       >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('AdditionalDetailsOrderRepository') protected additionalDetailsOrderRepositoryGetter: Getter<AdditionalDetailsOrderRepository>, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(AdditionalDetails, dataSource);
    // this.ordersAdditionalDetails = this.createHasManyThroughRepositoryFactoryFor('ordersAdditionalDetails', orderRepositoryGetter, additionalDetailsOrderRepositoryGetter,);
    // this.registerInclusionResolver('ordersAdditionalDetails', this.ordersAdditionalDetails.inclusionResolver);
    // this.orders = this.createHasManyThroughRepositoryFactoryFor('orders', orderRepositoryGetter, additionalDetailsOrderRepositoryGetter,);
    // this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    // this.additionalDetailsOrder = this.createHasManyThroughRepositoryFactoryFor('additionalDetailsOrder', orderRepositoryGetter, additionalDetailsOrderRepositoryGetter,);
    // this.registerInclusionResolver('additionalDetailsOrder', this.additionalDetailsOrder.inclusionResolver);
  }
}
