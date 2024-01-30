import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Product, ProductRelations, TaxGroup, ProductTaxGroup, Category, ProductCategory} from '../models';
import {ProductTaxGroupRepository} from './product-tax-group.repository';
import {TaxGroupRepository} from './tax-group.repository';
import {ProductCategoryRepository} from './product-category.repository';
import {CategoryRepository} from './category.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.productId,
  ProductRelations
> {

  public readonly taxGroups: HasManyThroughRepositoryFactory<TaxGroup, typeof TaxGroup.prototype.taxGroupId,
          ProductTaxGroup,
          typeof Product.prototype.productId
        >;

  public readonly categories: HasManyThroughRepositoryFactory<Category, typeof Category.prototype.categoryId,
          ProductCategory,
          typeof Product.prototype.productId
        >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('ProductTaxGroupRepository') protected productTaxGroupRepositoryGetter: Getter<ProductTaxGroupRepository>, @repository.getter('TaxGroupRepository') protected taxGroupRepositoryGetter: Getter<TaxGroupRepository>, @repository.getter('ProductCategoryRepository') protected productCategoryRepositoryGetter: Getter<ProductCategoryRepository>, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Product, dataSource);
    this.categories = this.createHasManyThroughRepositoryFactoryFor('categories', categoryRepositoryGetter, productCategoryRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
    this.taxGroups = this.createHasManyThroughRepositoryFactoryFor('taxGroups', taxGroupRepositoryGetter, productTaxGroupRepositoryGetter,);
    this.registerInclusionResolver('taxGroups', this.taxGroups.inclusionResolver);
  }
}
