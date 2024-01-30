import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductVariantGroup, ProductVariantGroupRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class ProductVariantGroupRepository extends DefaultCrudRepository<
  ProductVariantGroup,
  typeof ProductVariantGroup.prototype.productId,
  ProductVariantGroupRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof ProductVariantGroup.prototype.productId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(ProductVariantGroup, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
