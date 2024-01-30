import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductTaxGroup, ProductTaxGroupRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class ProductTaxGroupRepository extends DefaultCrudRepository<
  ProductTaxGroup,
  typeof ProductTaxGroup.prototype.productId,
  ProductTaxGroupRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof ProductTaxGroup.prototype.productId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(ProductTaxGroup, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
