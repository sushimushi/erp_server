import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductVariant, ProductVariantRelations, Variant, Product} from '../models';
import {VariantRepository} from './variant.repository';
import {ProductRepository} from './product.repository';

export class ProductVariantRepository extends DefaultCrudRepository<
  ProductVariant,
  typeof ProductVariant.prototype.variantId,
  ProductVariantRelations
> {

  public readonly variants: HasManyRepositoryFactory<Variant, typeof ProductVariant.prototype.variantId>;

  public readonly product: BelongsToAccessor<Product, typeof ProductVariant.prototype.variantId>;

  public readonly variant: BelongsToAccessor<Variant, typeof ProductVariant.prototype.variantId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('VariantRepository') protected variantRepositoryGetter: Getter<VariantRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(ProductVariant, dataSource);
    this.variant = this.createBelongsToAccessorFor('variant', variantRepositoryGetter,);
    this.registerInclusionResolver('variant', this.variant.inclusionResolver);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
    this.variants = this.createHasManyRepositoryFactoryFor('variants', variantRepositoryGetter,);
    this.registerInclusionResolver('variants', this.variants.inclusionResolver);
  }
}
