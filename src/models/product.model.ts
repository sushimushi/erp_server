import {Entity, model, property, hasMany} from '@loopback/repository';
import {TaxGroup} from './tax-group.model';
import {ProductTaxGroup} from './product-tax-group.model';
import {Category} from './category.model';
import {ProductCategory} from './product-category.model';
import {ProductPriceBook} from './product-price-book.model';
import {VariantGroup} from './variant-group.model';
import {ProductVariantGroup} from './product-variant-group.model';
import {AddonGroup} from './addon-group.model';
import {ProductAddonGroup} from './product-addon-group.model';
import {CustomPayment} from './custom-payment.model';
import {ProductCustomPayment} from './product-custom-payment.model';
import {OrderItem} from './order-item.model';
import {ProductOrder} from './product-order.model';
import {Discount} from './discount.model';
import {ProductDiscount} from './product-discount.model';
import {AdditionalDetails} from './additional-details.model';
import {ProductAdditionalDetails} from './product-additional-details.model';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  productId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  markedPrice: number;

  @property({
    type: 'string',
  })
  unitOfMeasure?: string;

  @property({
    type: 'number',
    required: true,
  })
  costPrice: number;

  @property({
    type: 'string',
    required: true,
  })
  sku: string;

  @property({
    type: 'string',
    required: true,
  })
  notes: string;

  @property({
    type: 'string',
    required: true,
  })
  barcodes: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isCombo: boolean;

  @property({
    type: 'object',
  })
  comboDetails: object;

  @hasMany(() => TaxGroup, {through: {model: () => ProductTaxGroup}})
  taxGroups: TaxGroup[];

  @hasMany(() => Category, {through: {model: () => ProductCategory}})
  categories: Category[];

  @hasMany(() => ProductPriceBook)
  productPriceBooks: ProductPriceBook[];

  @hasMany(() => VariantGroup, {through: {model: () => ProductVariantGroup}})
  productVariantGroup: VariantGroup[];

  @hasMany(() => AddonGroup, {through: {model: () => ProductAddonGroup}})
  productAddonGroup: AddonGroup[];

  @hasMany(() => CustomPayment, {through: {model: () => ProductCustomPayment}})
  productCustomPayment: CustomPayment[];

  @hasMany(() => OrderItem, {through: {model: () => ProductOrder}})
  orderItems: OrderItem[];

  @hasMany(() => Discount, {through: {model: () => ProductDiscount}})
  discounts: Discount[];

  @hasMany(() => AdditionalDetails, {through: {model: () => ProductAdditionalDetails}})
  additionalDetails: AdditionalDetails[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
