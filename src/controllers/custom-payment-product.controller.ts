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
CustomPayment,
// ProductCustomPayment,
Product,
} from '../models';
import {CustomPaymentRepository} from '../repositories';

export class CustomPaymentProductController {
  constructor(
    @repository(CustomPaymentRepository) protected customPaymentRepository: CustomPaymentRepository,
  ) { }

  @authenticate('jwt')
  @get('/custom-payments/{id}/products', {
    responses: {
      '200': {
        description: 'Array of CustomPayment has many Product through ProductCustomPayment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product[]> {
    return this.customPaymentRepository.products(id).find(filter);
  }

  @authenticate('jwt')
  @post('/custom-payments/{id}/products', {
    responses: {
      '200': {
        description: 'create a Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CustomPayment.prototype.customPaymentId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInCustomPayment',
            exclude: ['productId'],
          }),
        },
      },
    }) product: Omit<Product, 'productId'>,
  ): Promise<Product> {
    return this.customPaymentRepository.products(id).create(product);
  }

  @authenticate('jwt')
  @patch('/custom-payments/{id}/products', {
    responses: {
      '200': {
        description: 'CustomPayment.Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Partial<Product>,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.customPaymentRepository.products(id).patch(product, where);
  }

  @authenticate('jwt')
  @del('/custom-payments/{id}/products', {
    responses: {
      '200': {
        description: 'CustomPayment.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.customPaymentRepository.products(id).delete(where);
  }
}
