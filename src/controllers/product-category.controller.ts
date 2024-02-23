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
  Category,
  Product
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductCategoryController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/categories', {
    responses: {
      '200': {
        description: 'Array of Product has many Category through ProductCategory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Category)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Category>,
  ): Promise<Category[]> {
    return this.productRepository.categories(id).find(filter);
  }

  @authenticate('jwt')
  @post('/products/{id}/categories', {
    responses: {
      '200': {
        description: 'create a Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(Category)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.productId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {
            title: 'NewCategoryInProduct',
            exclude: ['categoryId'],
          }),
        },
      },
    }) category: Omit<Category, 'categoryId'>,
  ): Promise<Category> {
    return this.productRepository.categories(id).create(category);
  }

  @patch('/products/{id}/categories', {
    responses: {
      '200': {
        description: 'Product.Category PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {partial: true}),
        },
      },
    })
    category: Partial<Category>,
    @param.query.object('where', getWhereSchemaFor(Category)) where?: Where<Category>,
  ): Promise<Count> {
    return this.productRepository.categories(id).patch(category, where);
  }

  @del('/products/{id}/categories', {
    responses: {
      '200': {
        description: 'Product.Category DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Category)) where?: Where<Category>,
  ): Promise<Count> {
    return this.productRepository.categories(id).delete(where);
  }
}
