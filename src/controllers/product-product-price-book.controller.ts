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
  Product,
  ProductPriceBook,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductProductPriceBookController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/product-price-books', {
    responses: {
      '200': {
        description: 'Array of Product has many ProductPriceBook',
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
    return this.productRepository.productPriceBooks(id).find(filter);
  }

  @post('/products/{id}/product-price-books', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductPriceBook)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.productId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductPriceBook, {
            title: 'NewProductPriceBookInProduct',
            exclude: ['priceBookId'],
            optional: ['productId']
          }),
        },
      },
    }) productPriceBook: Omit<ProductPriceBook, 'priceBookId'>,
  ): Promise<ProductPriceBook> {
    return this.productRepository.productPriceBooks(id).create(productPriceBook);
  }

  @patch('/products/{id}/product-price-books', {
    responses: {
      '200': {
        description: 'Product.ProductPriceBook PATCH success count',
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
    return this.productRepository.productPriceBooks(id).patch(productPriceBook, where);
  }

  @del('/products/{id}/product-price-books', {
    responses: {
      '200': {
        description: 'Product.ProductPriceBook DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductPriceBook)) where?: Where<ProductPriceBook>,
  ): Promise<Count> {
    return this.productRepository.productPriceBooks(id).delete(where);
  }
}
