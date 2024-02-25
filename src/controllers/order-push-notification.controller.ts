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
  PushNotification,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderPushNotificationController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @authenticate('jwt')
  @get('/orders/{id}/push-notifications', {
    responses: {
      '200': {
        description: 'Array of Order has many PushNotification',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PushNotification)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PushNotification>,
  ): Promise<PushNotification[]> {
    return this.orderRepository.pushNotifications(id).find(filter);
  }

  @authenticate('jwt')
  @post('/orders/{id}/push-notifications', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(PushNotification)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Order.prototype.orderId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PushNotification, {
            title: 'NewPushNotificationInOrder',
            exclude: ['notificationId'],
            optional: ['orderId']
          }),
        },
      },
    }) pushNotification: Omit<PushNotification, 'notificationId'>,
  ): Promise<PushNotification> {
    return this.orderRepository.pushNotifications(id).create(pushNotification);
  }

  @authenticate('jwt')
  @patch('/orders/{id}/push-notifications', {
    responses: {
      '200': {
        description: 'Order.PushNotification PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PushNotification, {partial: true}),
        },
      },
    })
    pushNotification: Partial<PushNotification>,
    @param.query.object('where', getWhereSchemaFor(PushNotification)) where?: Where<PushNotification>,
  ): Promise<Count> {
    return this.orderRepository.pushNotifications(id).patch(pushNotification, where);
  }

  @authenticate('jwt')
  @del('/orders/{id}/push-notifications', {
    responses: {
      '200': {
        description: 'Order.PushNotification DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PushNotification)) where?: Where<PushNotification>,
  ): Promise<Count> {
    return this.orderRepository.pushNotifications(id).delete(where);
  }
}
