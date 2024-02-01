import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Channel} from '../models';
import {ChannelRepository} from '../repositories';

export class ChannelController {
  constructor(
    @repository(ChannelRepository)
    public channelRepository : ChannelRepository,
  ) {}

  @post('/channels')
  @response(200, {
    description: 'Channel model instance',
    content: {'application/json': {schema: getModelSchemaRef(Channel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Channel, {
            title: 'NewChannel',
            exclude: ['channelId'],
          }),
        },
      },
    })
    channel: Omit<Channel, 'channelId'>,
  ): Promise<Channel> {
    return this.channelRepository.create(channel);
  }

  @get('/channels/count')
  @response(200, {
    description: 'Channel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Channel) where?: Where<Channel>,
  ): Promise<Count> {
    return this.channelRepository.count(where);
  }

  @get('/channels')
  @response(200, {
    description: 'Array of Channel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Channel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Channel) filter?: Filter<Channel>,
  ): Promise<Channel[]> {
    return this.channelRepository.find(filter);
  }

  @patch('/channels')
  @response(200, {
    description: 'Channel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Channel, {partial: true}),
        },
      },
    })
    channel: Channel,
    @param.where(Channel) where?: Where<Channel>,
  ): Promise<Count> {
    return this.channelRepository.updateAll(channel, where);
  }

  @get('/channels/{id}')
  @response(200, {
    description: 'Channel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Channel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Channel, {exclude: 'where'}) filter?: FilterExcludingWhere<Channel>
  ): Promise<Channel> {
    return this.channelRepository.findById(id, filter);
  }

  @patch('/channels/{id}')
  @response(204, {
    description: 'Channel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Channel, {partial: true}),
        },
      },
    })
    channel: Channel,
  ): Promise<void> {
    await this.channelRepository.updateById(id, channel);
  }

  @put('/channels/{id}')
  @response(204, {
    description: 'Channel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() channel: Channel,
  ): Promise<void> {
    await this.channelRepository.replaceById(id, channel);
  }

  @del('/channels/{id}')
  @response(204, {
    description: 'Channel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.channelRepository.deleteById(id);
  }
}
