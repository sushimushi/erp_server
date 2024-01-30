import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductCategory, ProductCategoryRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class ProductCategoryRepository extends DefaultCrudRepository<
  ProductCategory,
  typeof ProductCategory.prototype.productId,
  ProductCategoryRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof ProductCategory.prototype.productId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(ProductCategory, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
