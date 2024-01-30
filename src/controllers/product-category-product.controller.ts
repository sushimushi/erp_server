import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductCategory,
  Product,
} from '../models';
import {ProductCategoryRepository} from '../repositories';

export class ProductCategoryProductController {
  constructor(
    @repository(ProductCategoryRepository)
    public productCategoryRepository: ProductCategoryRepository,
  ) { }

  @get('/product-categories/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to ProductCategory',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product),
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.string('id') id: typeof ProductCategory.prototype.productId,
  ): Promise<Product> {
    return this.productCategoryRepository.product(id);
  }
}
