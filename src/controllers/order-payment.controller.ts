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
  Order,
  Payment,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderPaymentController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/payments', {
    responses: {
      '200': {
        description: 'Array of Order has many Payment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Payment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Payment>,
  ): Promise<Payment[]> {
    return this.orderRepository.orderPayment(id).find(filter);
  }

  @post('/orders/{id}/payments', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(Payment)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Order.prototype.orderId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {
            title: 'NewPaymentInOrder',
            exclude: ['paymentId'],
            optional: ['transactedBy']
          }),
        },
      },
    }) payment: Omit<Payment, 'paymentId'>,
  ): Promise<Payment> {
    return this.orderRepository.orderPayment(id).create(payment);
  }

  @patch('/orders/{id}/payments', {
    responses: {
      '200': {
        description: 'Order.Payment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {partial: true}),
        },
      },
    })
    payment: Partial<Payment>,
    @param.query.object('where', getWhereSchemaFor(Payment)) where?: Where<Payment>,
  ): Promise<Count> {
    return this.orderRepository.orderPayment(id).patch(payment, where);
  }

  @del('/orders/{id}/payments', {
    responses: {
      '200': {
        description: 'Order.Payment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Payment)) where?: Where<Payment>,
  ): Promise<Count> {
    return this.orderRepository.orderPayment(id).delete(where);
  }
}
