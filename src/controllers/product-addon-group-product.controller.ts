import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductAddonGroup,
  Product,
} from '../models';
import {ProductAddonGroupRepository} from '../repositories';

export class ProductAddonGroupProductController {
  constructor(
    @repository(ProductAddonGroupRepository)
    public productAddonGroupRepository: ProductAddonGroupRepository,
  ) { }

  @get('/product-addon-groups/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to ProductAddonGroup',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product),
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.string('id') id: typeof ProductAddonGroup.prototype.productId,
  ): Promise<Product> {
    return this.productAddonGroupRepository.product(id);
  }
}
