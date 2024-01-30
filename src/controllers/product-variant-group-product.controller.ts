import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductVariantGroup,
  Product,
} from '../models';
import {ProductVariantGroupRepository} from '../repositories';

export class ProductVariantGroupProductController {
  constructor(
    @repository(ProductVariantGroupRepository)
    public productVariantGroupRepository: ProductVariantGroupRepository,
  ) { }

  @get('/product-variant-groups/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to ProductVariantGroup',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product),
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.string('id') id: typeof ProductVariantGroup.prototype.productId,
  ): Promise<Product> {
    return this.productVariantGroupRepository.product(id);
  }
}
