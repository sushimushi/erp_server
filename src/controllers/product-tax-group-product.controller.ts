import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductTaxGroup,
  Product,
} from '../models';
import {ProductTaxGroupRepository} from '../repositories';

export class ProductTaxGroupProductController {
  constructor(
    @repository(ProductTaxGroupRepository)
    public productTaxGroupRepository: ProductTaxGroupRepository,
  ) { }

  @get('/product-tax-groups/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to ProductTaxGroup',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product),
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.string('id') id: typeof ProductTaxGroup.prototype.productId,
  ): Promise<Product> {
    return this.productTaxGroupRepository.product(id);
  }
}
