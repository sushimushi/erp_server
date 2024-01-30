import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductAddonGroup, ProductAddonGroupRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class ProductAddonGroupRepository extends DefaultCrudRepository<
  ProductAddonGroup,
  typeof ProductAddonGroup.prototype.productId,
  ProductAddonGroupRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof ProductAddonGroup.prototype.productId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(ProductAddonGroup, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
