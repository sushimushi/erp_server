import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {PushNotification} from '../models';
import {PushNotificationRepository} from '../repositories';

export class PushNotificationController {
  constructor(
    @repository(PushNotificationRepository)
    public pushNotificationRepository : PushNotificationRepository,
  ) {}

  @authenticate('jwt')
  @post('/push-notifications')
  @response(200, {
    description: 'PushNotification model instance',
    content: {'application/json': {schema: getModelSchemaRef(PushNotification)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PushNotification, {
            title: 'NewPushNotification',
            exclude: ['notificationId'],
          }),
        },
      },
    })
    pushNotification: Omit<PushNotification, 'notificationId'>,
  ): Promise<PushNotification> {
    return this.pushNotificationRepository.create(pushNotification);
  }

  @get('/push-notifications/count')
  @response(200, {
    description: 'PushNotification model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PushNotification) where?: Where<PushNotification>,
  ): Promise<Count> {
    return this.pushNotificationRepository.count(where);
  }

  @get('/push-notifications')
  @response(200, {
    description: 'Array of PushNotification model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PushNotification, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PushNotification) filter?: Filter<PushNotification>,
  ): Promise<PushNotification[]> {
    return this.pushNotificationRepository.find(filter);
  }

  @patch('/push-notifications')
  @response(200, {
    description: 'PushNotification PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PushNotification, {partial: true}),
        },
      },
    })
    pushNotification: PushNotification,
    @param.where(PushNotification) where?: Where<PushNotification>,
  ): Promise<Count> {
    return this.pushNotificationRepository.updateAll(pushNotification, where);
  }

  @get('/push-notifications/{id}')
  @response(200, {
    description: 'PushNotification model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PushNotification, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PushNotification, {exclude: 'where'}) filter?: FilterExcludingWhere<PushNotification>
  ): Promise<PushNotification> {
    return this.pushNotificationRepository.findById(id, filter);
  }

  @patch('/push-notifications/{id}')
  @response(204, {
    description: 'PushNotification PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PushNotification, {partial: true}),
        },
      },
    })
    pushNotification: PushNotification,
  ): Promise<void> {
    await this.pushNotificationRepository.updateById(id, pushNotification);
  }

  @put('/push-notifications/{id}')
  @response(204, {
    description: 'PushNotification PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pushNotification: PushNotification,
  ): Promise<void> {
    await this.pushNotificationRepository.replaceById(id, pushNotification);
  }

  @del('/push-notifications/{id}')
  @response(204, {
    description: 'PushNotification DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pushNotificationRepository.deleteById(id);
  }
}
