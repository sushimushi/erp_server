import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PushNotification,
  Order,
} from '../models';
import {PushNotificationRepository} from '../repositories';

export class PushNotificationOrderController {
  constructor(
    @repository(PushNotificationRepository)
    public pushNotificationRepository: PushNotificationRepository,
  ) { }

  @get('/push-notifications/{id}/order', {
    responses: {
      '200': {
        description: 'Order belonging to PushNotification',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Order),
          },
        },
      },
    },
  })
  async getOrder(
    @param.path.string('id') id: typeof PushNotification.prototype.notificationId,
  ): Promise<Order> {
    return this.pushNotificationRepository.order(id);
  }
}
