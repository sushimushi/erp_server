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
  OrderItem,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderOrderItemController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @authenticate('jwt')
  @get('/orders/{id}/order-items', {
    responses: {
      '200': {
        description: 'Array of Order has many OrderItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrderItem)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<OrderItem>,
  ): Promise<OrderItem[]> {
    return this.orderRepository.orderItems(id).find(filter);
  }

  @authenticate('jwt')
  @post('/orders/{id}/order-items', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderItem)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Order.prototype.orderId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderItem, {
            title: 'NewOrderItemInOrder',
            exclude: ['orderItemId'],
            optional: ['orderId']
          }),
        },
      },
    }) orderItem: Omit<OrderItem, 'orderItemId'>,
  ): Promise<OrderItem> {
    return this.orderRepository.orderItems(id).create(orderItem);
  }

  @authenticate('jwt')
  @patch('/orders/{id}/order-items', {
    responses: {
      '200': {
        description: 'Order.OrderItem PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderItem, {partial: true}),
        },
      },
    })
    orderItem: Partial<OrderItem>,
    @param.query.object('where', getWhereSchemaFor(OrderItem)) where?: Where<OrderItem>,
  ): Promise<Count> {
    return this.orderRepository.orderItems(id).patch(orderItem, where);
  }

  @authenticate('jwt')
  @del('/orders/{id}/order-items', {
    responses: {
      '200': {
        description: 'Order.OrderItem DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OrderItem)) where?: Where<OrderItem>,
  ): Promise<Count> {
    return this.orderRepository.orderItems(id).delete(where);
  }
}
