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
import {Tax} from '../models';
import {TaxRepository} from '../repositories';

export class TaxController {
  constructor(
    @repository(TaxRepository)
    public taxRepository : TaxRepository,
  ) {}

  @authenticate('jwt')
  @post('/taxes')
  @response(200, {
    description: 'Tax model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tax)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tax, {
            title: 'NewTax',
            exclude: ['taxId'],
          }),
        },
      },
    })
    tax: Omit<Tax, 'taxId'>,
  ): Promise<Tax> {
    return this.taxRepository.create(tax);
  }

  @get('/taxes/count')
  @response(200, {
    description: 'Tax model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tax) where?: Where<Tax>,
  ): Promise<Count> {
    return this.taxRepository.count(where);
  }

  @get('/taxes')
  @response(200, {
    description: 'Array of Tax model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tax, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tax) filter?: Filter<Tax>,
  ): Promise<Tax[]> {
    return this.taxRepository.find(filter);
  }

  @patch('/taxes')
  @response(200, {
    description: 'Tax PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tax, {partial: true}),
        },
      },
    })
    tax: Tax,
    @param.where(Tax) where?: Where<Tax>,
  ): Promise<Count> {
    return this.taxRepository.updateAll(tax, where);
  }

  @get('/taxes/{id}')
  @response(200, {
    description: 'Tax model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tax, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tax, {exclude: 'where'}) filter?: FilterExcludingWhere<Tax>
  ): Promise<Tax> {
    return this.taxRepository.findById(id, filter);
  }

  @patch('/taxes/{id}')
  @response(204, {
    description: 'Tax PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tax, {partial: true}),
        },
      },
    })
    tax: Tax,
  ): Promise<void> {
    await this.taxRepository.updateById(id, tax);
  }

  @put('/taxes/{id}')
  @response(204, {
    description: 'Tax PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tax: Tax,
  ): Promise<void> {
    await this.taxRepository.replaceById(id, tax);
  }

  @del('/taxes/{id}')
  @response(204, {
    description: 'Tax DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.taxRepository.deleteById(id);
  }
}
