import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductPriceBook,
  Account,
} from '../models';
import {ProductPriceBookRepository} from '../repositories';

export class ProductPriceBookAccountController {
  constructor(
    @repository(ProductPriceBookRepository)
    public productPriceBookRepository: ProductPriceBookRepository,
  ) { }

  @get('/product-price-books/{id}/account', {
    responses: {
      '200': {
        description: 'Account belonging to ProductPriceBook',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Account),
          },
        },
      },
    },
  })
  async getAccount(
    @param.path.string('id') id: typeof ProductPriceBook.prototype.priceBookId,
  ): Promise<Account> {
    return this.productPriceBookRepository.account(id);
  }
}
