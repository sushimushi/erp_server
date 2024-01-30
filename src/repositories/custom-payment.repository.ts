import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {CustomPayment, CustomPaymentRelations, Product, ProductCustomPayment} from '../models';
import {ProductCustomPaymentRepository} from './product-custom-payment.repository';
import {ProductRepository} from './product.repository';

export class CustomPaymentRepository extends DefaultCrudRepository<
  CustomPayment,
  typeof CustomPayment.prototype.customPaymentId,
  CustomPaymentRelations
> {

  public readonly products: HasManyThroughRepositoryFactory<Product, typeof Product.prototype.productId,
          ProductCustomPayment,
          typeof CustomPayment.prototype.customPaymentId
        >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('ProductCustomPaymentRepository') protected productCustomPaymentRepositoryGetter: Getter<ProductCustomPaymentRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(CustomPayment, dataSource);
    this.products = this.createHasManyThroughRepositoryFactoryFor('products', productRepositoryGetter, productCustomPaymentRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
