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
  Order,
  Refund,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderRefundController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @authenticate('jwt')
  @get('/orders/{id}/refunds', {
    responses: {
      '200': {
        description: 'Array of Order has many Refund',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Refund)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Refund>,
  ): Promise<Refund[]> {
    return this.orderRepository.refunds(id).find(filter);
  }

  @authenticate('jwt')
  @post('/orders/{id}/refunds', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(Refund)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Order.prototype.orderId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Refund, {
            title: 'NewRefundInOrder',
            exclude: ['refundId'],
            optional: ['updatedBy']
          }),
        },
      },
    }) refund: Omit<Refund, 'refundId'>,
  ): Promise<Refund> {
    return this.orderRepository.refunds(id).create(refund);
  }

  @authenticate('jwt')
  @patch('/orders/{id}/refunds', {
    responses: {
      '200': {
        description: 'Order.Refund PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Refund, {partial: true}),
        },
      },
    })
    refund: Partial<Refund>,
    @param.query.object('where', getWhereSchemaFor(Refund)) where?: Where<Refund>,
  ): Promise<Count> {
    return this.orderRepository.refunds(id).patch(refund, where);
  }

  @authenticate('jwt')
  @del('/orders/{id}/refunds', {
    responses: {
      '200': {
        description: 'Order.Refund DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Refund)) where?: Where<Refund>,
  ): Promise<Count> {
    return this.orderRepository.refunds(id).delete(where);
  }
}
