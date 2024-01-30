import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductVariant,
  Product,
} from '../models';
import {ProductVariantRepository} from '../repositories';

export class ProductVariantProductController {
  constructor(
    @repository(ProductVariantRepository)
    public productVariantRepository: ProductVariantRepository,
  ) { }

  @get('/product-variants/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to ProductVariant',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product),
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.string('id') id: typeof ProductVariant.prototype.variantId,
  ): Promise<Product> {
    return this.productVariantRepository.product(id);
  }
}
