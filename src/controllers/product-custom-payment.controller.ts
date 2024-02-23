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
  Product
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductCustomPaymentController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/custom-payments', {
    responses: {
      '200': {
        description: 'Array of Product has many CustomPayment through ProductCustomPayment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CustomPayment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CustomPayment>,
  ): Promise<CustomPayment[]> {
    return this.productRepository.productCustomPayment(id).find(filter);
  }

  @authenticate('jwt')
  @post('/products/{id}/custom-payments', {
    responses: {
      '200': {
        description: 'create a CustomPayment model instance',
        content: {'application/json': {schema: getModelSchemaRef(CustomPayment)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.productId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomPayment, {
            title: 'NewCustomPaymentInProduct',
            exclude: ['customPaymentId'],
          }),
        },
      },
    }) customPayment: Omit<CustomPayment, 'customPaymentId'>,
  ): Promise<CustomPayment> {
    return this.productRepository.productCustomPayment(id).create(customPayment);
  }

  @patch('/products/{id}/custom-payments', {
    responses: {
      '200': {
        description: 'Product.CustomPayment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomPayment, {partial: true}),
        },
      },
    })
    customPayment: Partial<CustomPayment>,
    @param.query.object('where', getWhereSchemaFor(CustomPayment)) where?: Where<CustomPayment>,
  ): Promise<Count> {
    return this.productRepository.productCustomPayment(id).patch(customPayment, where);
  }

  @del('/products/{id}/custom-payments', {
    responses: {
      '200': {
        description: 'Product.CustomPayment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CustomPayment)) where?: Where<CustomPayment>,
  ): Promise<Count> {
    return this.productRepository.productCustomPayment(id).delete(where);
  }
}
