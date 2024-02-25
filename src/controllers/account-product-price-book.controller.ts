import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Account,
  ProductPriceBook,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountProductPriceBookController {
  constructor(
    @repository(AccountRepository) protected accountRepository: AccountRepository,
  ) { }

  @authenticate('jwt')
  @get('/accounts/{id}/product-price-books', {
    responses: {
      '200': {
        description: 'Array of Account has many ProductPriceBook',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductPriceBook)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProductPriceBook>,
  ): Promise<ProductPriceBook[]> {
    return this.accountRepository.productPriceBooks(id).find(filter);
  }

  @authenticate('jwt')
  @post('/accounts/{id}/product-price-books', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductPriceBook)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Account.prototype.accountId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductPriceBook, {
            title: 'NewProductPriceBookInAccount',
            exclude: ['priceBookId'],
            optional: ['accountId']
          }),
        },
      },
    }) productPriceBook: Omit<ProductPriceBook, 'priceBookId'>,
  ): Promise<ProductPriceBook> {
    return this.accountRepository.productPriceBooks(id).create(productPriceBook);
  }

  @authenticate('jwt')
  @patch('/accounts/{id}/product-price-books', {
    responses: {
      '200': {
        description: 'Account.ProductPriceBook PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductPriceBook, {partial: true}),
        },
      },
    })
    productPriceBook: Partial<ProductPriceBook>,
    @param.query.object('where', getWhereSchemaFor(ProductPriceBook)) where?: Where<ProductPriceBook>,
  ): Promise<Count> {
    return this.accountRepository.productPriceBooks(id).patch(productPriceBook, where);
  }

  @authenticate('jwt')
  @del('/accounts/{id}/product-price-books', {
    responses: {
      '200': {
        description: 'Account.ProductPriceBook DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductPriceBook)) where?: Where<ProductPriceBook>,
  ): Promise<Count> {
    return this.accountRepository.productPriceBooks(id).delete(where);
  }
}
