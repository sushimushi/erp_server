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
  Discount,
  Product
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductDiscountController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/discounts', {
    responses: {
      '200': {
        description: 'Array of Product has many Discount through ProductDiscount',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Discount)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Discount>,
  ): Promise<Discount[]> {
    return this.productRepository.discounts(id).find(filter);
  }

  @authenticate('jwt')
  @post('/products/{id}/discounts', {
    responses: {
      '200': {
        description: 'create a Discount model instance',
        content: {'application/json': {schema: getModelSchemaRef(Discount)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.productId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Discount, {
            title: 'NewDiscountInProduct',
            exclude: ['discountId'],
          }),
        },
      },
    }) discount: Omit<Discount, 'discountId'>,
  ): Promise<Discount> {
    return this.productRepository.discounts(id).create(discount);
  }

  @patch('/products/{id}/discounts', {
    responses: {
      '200': {
        description: 'Product.Discount PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Discount, {partial: true}),
        },
      },
    })
    discount: Partial<Discount>,
    @param.query.object('where', getWhereSchemaFor(Discount)) where?: Where<Discount>,
  ): Promise<Count> {
    return this.productRepository.discounts(id).patch(discount, where);
  }

  @del('/products/{id}/discounts', {
    responses: {
      '200': {
        description: 'Product.Discount DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Discount)) where?: Where<Discount>,
  ): Promise<Count> {
    return this.productRepository.discounts(id).delete(where);
  }
}
