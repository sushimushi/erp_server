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
import {Crm} from '../models';
import {CrmRepository} from '../repositories';

export class CrmController {
  constructor(
    @repository(CrmRepository)
    public crmRepository : CrmRepository,
  ) {}

  @post('/crms')
  @response(200, {
    description: 'Crm model instance',
    content: {'application/json': {schema: getModelSchemaRef(Crm)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crm, {
            title: 'NewCrm',
            exclude: ['crmId'],
          }),
        },
      },
    })
    crm: Omit<Crm, 'crmId'>,
  ): Promise<Crm> {
    return this.crmRepository.create(crm);
  }

  @get('/crms/count')
  @response(200, {
    description: 'Crm model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Crm) where?: Where<Crm>,
  ): Promise<Count> {
    return this.crmRepository.count(where);
  }

  @get('/crms')
  @response(200, {
    description: 'Array of Crm model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Crm, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Crm) filter?: Filter<Crm>,
  ): Promise<Crm[]> {
    return this.crmRepository.find(filter);
  }

  @patch('/crms')
  @response(200, {
    description: 'Crm PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crm, {partial: true}),
        },
      },
    })
    crm: Crm,
    @param.where(Crm) where?: Where<Crm>,
  ): Promise<Count> {
    return this.crmRepository.updateAll(crm, where);
  }

  @get('/crms/{id}')
  @response(200, {
    description: 'Crm model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Crm, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Crm, {exclude: 'where'}) filter?: FilterExcludingWhere<Crm>
  ): Promise<Crm> {
    return this.crmRepository.findById(id, filter);
  }

  @patch('/crms/{id}')
  @response(204, {
    description: 'Crm PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crm, {partial: true}),
        },
      },
    })
    crm: Crm,
  ): Promise<void> {
    await this.crmRepository.updateById(id, crm);
  }

  @put('/crms/{id}')
  @response(204, {
    description: 'Crm PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() crm: Crm,
  ): Promise<void> {
    await this.crmRepository.replaceById(id, crm);
  }

  @del('/crms/{id}')
  @response(204, {
    description: 'Crm DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.crmRepository.deleteById(id);
  }
}
