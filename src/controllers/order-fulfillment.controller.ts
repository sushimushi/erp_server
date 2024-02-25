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
  Fulfillment,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderFulfillmentController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @authenticate('jwt')
  @get('/orders/{id}/fulfillment', {
    responses: {
      '200': {
        description: 'Order has one Fulfillment',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Fulfillment),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Fulfillment>,
  ): Promise<Fulfillment> {
    return this.orderRepository.fulfillment(id).get(filter);
  }

  @authenticate('jwt')
  @post('/orders/{id}/fulfillment', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(Fulfillment)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Order.prototype.orderId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fulfillment, {
            title: 'NewFulfillmentInOrder',
            exclude: ['fulfillmentId'],
            optional: ['receiptId']
          }),
        },
      },
    }) fulfillment: Omit<Fulfillment, 'fulfillmentId'>,
  ): Promise<Fulfillment> {
    return this.orderRepository.fulfillment(id).create(fulfillment);
  }

  @authenticate('jwt')
  @patch('/orders/{id}/fulfillment', {
    responses: {
      '200': {
        description: 'Order.Fulfillment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fulfillment, {partial: true}),
        },
      },
    })
    fulfillment: Partial<Fulfillment>,
    @param.query.object('where', getWhereSchemaFor(Fulfillment)) where?: Where<Fulfillment>,
  ): Promise<Count> {
    return this.orderRepository.fulfillment(id).patch(fulfillment, where);
  }

  @authenticate('jwt')
  @del('/orders/{id}/fulfillment', {
    responses: {
      '200': {
        description: 'Order.Fulfillment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Fulfillment)) where?: Where<Fulfillment>,
  ): Promise<Count> {
    return this.orderRepository.fulfillment(id).delete(where);
  }
}
