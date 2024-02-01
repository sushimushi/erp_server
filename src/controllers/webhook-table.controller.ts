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
import {WebhookTable} from '../models';
import {WebhookTableRepository} from '../repositories';

export class WebhookTableController {
  constructor(
    @repository(WebhookTableRepository)
    public webhookTableRepository : WebhookTableRepository,
  ) {}

  @post('/webhook-tables')
  @response(200, {
    description: 'WebhookTable model instance',
    content: {'application/json': {schema: getModelSchemaRef(WebhookTable)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WebhookTable, {
            title: 'NewWebhookTable',
            exclude: ['webhookId'],
          }),
        },
      },
    })
    webhookTable: Omit<WebhookTable, 'webhookId'>,
  ): Promise<WebhookTable> {
    return this.webhookTableRepository.create(webhookTable);
  }

  @get('/webhook-tables/count')
  @response(200, {
    description: 'WebhookTable model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(WebhookTable) where?: Where<WebhookTable>,
  ): Promise<Count> {
    return this.webhookTableRepository.count(where);
  }

  @get('/webhook-tables')
  @response(200, {
    description: 'Array of WebhookTable model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WebhookTable, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(WebhookTable) filter?: Filter<WebhookTable>,
  ): Promise<WebhookTable[]> {
    return this.webhookTableRepository.find(filter);
  }

  @patch('/webhook-tables')
  @response(200, {
    description: 'WebhookTable PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WebhookTable, {partial: true}),
        },
      },
    })
    webhookTable: WebhookTable,
    @param.where(WebhookTable) where?: Where<WebhookTable>,
  ): Promise<Count> {
    return this.webhookTableRepository.updateAll(webhookTable, where);
  }

  @get('/webhook-tables/{id}')
  @response(200, {
    description: 'WebhookTable model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(WebhookTable, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(WebhookTable, {exclude: 'where'}) filter?: FilterExcludingWhere<WebhookTable>
  ): Promise<WebhookTable> {
    return this.webhookTableRepository.findById(id, filter);
  }

  @patch('/webhook-tables/{id}')
  @response(204, {
    description: 'WebhookTable PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WebhookTable, {partial: true}),
        },
      },
    })
    webhookTable: WebhookTable,
  ): Promise<void> {
    await this.webhookTableRepository.updateById(id, webhookTable);
  }

  @put('/webhook-tables/{id}')
  @response(204, {
    description: 'WebhookTable PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() webhookTable: WebhookTable,
  ): Promise<void> {
    await this.webhookTableRepository.replaceById(id, webhookTable);
  }

  @del('/webhook-tables/{id}')
  @response(204, {
    description: 'WebhookTable DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.webhookTableRepository.deleteById(id);
  }
}
