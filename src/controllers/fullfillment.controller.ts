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
import {Fulfillment} from '../models';
import {FulfillmentRepository} from '../repositories';

export class FullfillmentController {
  constructor(
    @repository(FulfillmentRepository)
    public fulfillmentRepository : FulfillmentRepository,
  ) {}

  @authenticate('jwt')
  @post('/fulfillments')
  @response(200, {
    description: 'Fulfillment model instance',
    content: {'application/json': {schema: getModelSchemaRef(Fulfillment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fulfillment, {
            title: 'NewFulfillment',
            exclude: ['fulfillmentId'],
          }),
        },
      },
    })
    fulfillment: Omit<Fulfillment, 'fulfillmentId'>,
  ): Promise<Fulfillment> {
    return this.fulfillmentRepository.create(fulfillment);
  }

  @authenticate('jwt')
  @get('/fulfillments/count')
  @response(200, {
    description: 'Fulfillment model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Fulfillment) where?: Where<Fulfillment>,
  ): Promise<Count> {
    return this.fulfillmentRepository.count(where);
  }

  @authenticate('jwt')
  @get('/fulfillments')
  @response(200, {
    description: 'Array of Fulfillment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Fulfillment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Fulfillment) filter?: Filter<Fulfillment>,
  ): Promise<Fulfillment[]> {
    return this.fulfillmentRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/fulfillments')
  @response(200, {
    description: 'Fulfillment PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fulfillment, {partial: true}),
        },
      },
    })
    fulfillment: Fulfillment,
    @param.where(Fulfillment) where?: Where<Fulfillment>,
  ): Promise<Count> {
    return this.fulfillmentRepository.updateAll(fulfillment, where);
  }

  @authenticate('jwt')
  @get('/fulfillments/{id}')
  @response(200, {
    description: 'Fulfillment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Fulfillment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Fulfillment, {exclude: 'where'}) filter?: FilterExcludingWhere<Fulfillment>
  ): Promise<Fulfillment> {
    return this.fulfillmentRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/fulfillments/{id}')
  @response(204, {
    description: 'Fulfillment PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fulfillment, {partial: true}),
        },
      },
    })
    fulfillment: Fulfillment,
  ): Promise<void> {
    await this.fulfillmentRepository.updateById(id, fulfillment);
  }

  @authenticate('jwt')
  @put('/fulfillments/{id}')
  @response(204, {
    description: 'Fulfillment PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() fulfillment: Fulfillment,
  ): Promise<void> {
    await this.fulfillmentRepository.replaceById(id, fulfillment);
  }

  @authenticate('jwt')
  @del('/fulfillments/{id}')
  @response(204, {
    description: 'Fulfillment DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.fulfillmentRepository.deleteById(id);
  }
}
