import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Product, ProductRelations, TaxGroup, ProductTaxGroup, Category, ProductCategory, ProductPriceBook, VariantGroup, ProductVariantGroup, AddonGroup, ProductAddonGroup, CustomPayment, ProductCustomPayment, OrderItem, ProductOrder, Discount, ProductDiscount, AdditionalDetails, ProductAdditionalDetails} from '../models';
import {ProductTaxGroupRepository} from './product-tax-group.repository';
import {TaxGroupRepository} from './tax-group.repository';
import {ProductCategoryRepository} from './product-category.repository';
import {CategoryRepository} from './category.repository';
import {ProductPriceBookRepository} from './product-price-book.repository';
import {ProductVariantGroupRepository} from './product-variant-group.repository';
import {VariantGroupRepository} from './variant-group.repository';
import {ProductAddonGroupRepository} from './product-addon-group.repository';
import {AddonGroupRepository} from './addon-group.repository';
import {ProductCustomPaymentRepository} from './product-custom-payment.repository';
import {CustomPaymentRepository} from './custom-payment.repository';
import {ProductOrderRepository} from './product-order.repository';
import {OrderItemRepository} from './order-item.repository';
import {ProductDiscountRepository} from './product-discount.repository';
import {DiscountRepository} from './discount.repository';
import {ProductAdditionalDetailsRepository} from './product-additional-details.repository';
import {AdditionalDetailsRepository} from './additional-details.repository';

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

  public readonly productPriceBooks: HasManyRepositoryFactory<ProductPriceBook, typeof Product.prototype.productId>;

  public readonly productVariantGroup: HasManyThroughRepositoryFactory<VariantGroup, typeof VariantGroup.prototype.variantGroupId,
          ProductVariantGroup,
          typeof Product.prototype.productId
        >;

  public readonly productAddonGroup: HasManyThroughRepositoryFactory<AddonGroup, typeof AddonGroup.prototype.addonGroupId,
          ProductAddonGroup,
          typeof Product.prototype.productId
        >;

  public readonly productCustomPayment: HasManyThroughRepositoryFactory<CustomPayment, typeof CustomPayment.prototype.customPaymentId,
          ProductCustomPayment,
          typeof Product.prototype.productId
        >;

  public readonly orderItems: HasManyThroughRepositoryFactory<OrderItem, typeof OrderItem.prototype.orderItemId,
          ProductOrder,
          typeof Product.prototype.productId
        >;

  public readonly discounts: HasManyThroughRepositoryFactory<Discount, typeof Discount.prototype.discountId,
          ProductDiscount,
          typeof Product.prototype.productId
        >;

  public readonly additionalDetails: HasManyThroughRepositoryFactory<AdditionalDetails, typeof AdditionalDetails.prototype.additionalDetailId,
          ProductAdditionalDetails,
          typeof Product.prototype.productId
        >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('ProductTaxGroupRepository') protected productTaxGroupRepositoryGetter: Getter<ProductTaxGroupRepository>, @repository.getter('TaxGroupRepository') protected taxGroupRepositoryGetter: Getter<TaxGroupRepository>, @repository.getter('ProductCategoryRepository') protected productCategoryRepositoryGetter: Getter<ProductCategoryRepository>, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>, @repository.getter('ProductPriceBookRepository') protected productPriceBookRepositoryGetter: Getter<ProductPriceBookRepository>, @repository.getter('ProductVariantGroupRepository') protected productVariantGroupRepositoryGetter: Getter<ProductVariantGroupRepository>, @repository.getter('VariantGroupRepository') protected variantGroupRepositoryGetter: Getter<VariantGroupRepository>, @repository.getter('ProductAddonGroupRepository') protected productAddonGroupRepositoryGetter: Getter<ProductAddonGroupRepository>, @repository.getter('AddonGroupRepository') protected addonGroupRepositoryGetter: Getter<AddonGroupRepository>, @repository.getter('ProductCustomPaymentRepository') protected productCustomPaymentRepositoryGetter: Getter<ProductCustomPaymentRepository>, @repository.getter('CustomPaymentRepository') protected customPaymentRepositoryGetter: Getter<CustomPaymentRepository>, @repository.getter('ProductOrderRepository') protected productOrderRepositoryGetter: Getter<ProductOrderRepository>, @repository.getter('OrderItemRepository') protected orderItemRepositoryGetter: Getter<OrderItemRepository>, @repository.getter('ProductDiscountRepository') protected productDiscountRepositoryGetter: Getter<ProductDiscountRepository>, @repository.getter('DiscountRepository') protected discountRepositoryGetter: Getter<DiscountRepository>, @repository.getter('ProductAdditionalDetailsRepository') protected productAdditionalDetailsRepositoryGetter: Getter<ProductAdditionalDetailsRepository>, @repository.getter('AdditionalDetailsRepository') protected additionalDetailsRepositoryGetter: Getter<AdditionalDetailsRepository>,
  ) {
    super(Product, dataSource);
    this.additionalDetails = this.createHasManyThroughRepositoryFactoryFor('additionalDetails', additionalDetailsRepositoryGetter, productAdditionalDetailsRepositoryGetter,);
    this.registerInclusionResolver('additionalDetails', this.additionalDetails.inclusionResolver);
    this.discounts = this.createHasManyThroughRepositoryFactoryFor('discounts', discountRepositoryGetter, productDiscountRepositoryGetter,);
    this.registerInclusionResolver('discounts', this.discounts.inclusionResolver);
    this.orderItems = this.createHasManyThroughRepositoryFactoryFor('orderItems', orderItemRepositoryGetter, productOrderRepositoryGetter,);
    this.registerInclusionResolver('orderItems', this.orderItems.inclusionResolver);
    this.productCustomPayment = this.createHasManyThroughRepositoryFactoryFor('productCustomPayment', customPaymentRepositoryGetter, productCustomPaymentRepositoryGetter,);
    this.registerInclusionResolver('productCustomPayment', this.productCustomPayment.inclusionResolver);
    this.productAddonGroup = this.createHasManyThroughRepositoryFactoryFor('productAddonGroup', addonGroupRepositoryGetter, productAddonGroupRepositoryGetter,);
    this.registerInclusionResolver('productAddonGroup', this.productAddonGroup.inclusionResolver);
    this.productVariantGroup = this.createHasManyThroughRepositoryFactoryFor('productVariantGroup', variantGroupRepositoryGetter, productVariantGroupRepositoryGetter,);
    this.registerInclusionResolver('productVariantGroup', this.productVariantGroup.inclusionResolver);
    this.productPriceBooks = this.createHasManyRepositoryFactoryFor('productPriceBooks', productPriceBookRepositoryGetter,);
    this.registerInclusionResolver('productPriceBooks', this.productPriceBooks.inclusionResolver);
    this.categories = this.createHasManyThroughRepositoryFactoryFor('categories', categoryRepositoryGetter, productCategoryRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
    this.taxGroups = this.createHasManyThroughRepositoryFactoryFor('taxGroups', taxGroupRepositoryGetter, productTaxGroupRepositoryGetter,);
    this.registerInclusionResolver('taxGroups', this.taxGroups.inclusionResolver);
  }
}
