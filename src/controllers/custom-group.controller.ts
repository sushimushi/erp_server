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
import {ComboGroup} from '../models';
import {ComboGroupRepository} from '../repositories';

export class CustomGroupController {
  constructor(
    @repository(ComboGroupRepository)
    public comboGroupRepository : ComboGroupRepository,
  ) {}

  @post('/combo-groups')
  @response(200, {
    description: 'ComboGroup model instance',
    content: {'application/json': {schema: getModelSchemaRef(ComboGroup)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ComboGroup, {
            title: 'NewComboGroup',
            exclude: ['comboGroupId'],
          }),
        },
      },
    })
    comboGroup: Omit<ComboGroup, 'comboGroupId'>,
  ): Promise<ComboGroup> {
    return this.comboGroupRepository.create(comboGroup);
  }

  @get('/combo-groups/count')
  @response(200, {
    description: 'ComboGroup model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ComboGroup) where?: Where<ComboGroup>,
  ): Promise<Count> {
    return this.comboGroupRepository.count(where);
  }

  @get('/combo-groups')
  @response(200, {
    description: 'Array of ComboGroup model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ComboGroup, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ComboGroup) filter?: Filter<ComboGroup>,
  ): Promise<ComboGroup[]> {
    return this.comboGroupRepository.find(filter);
  }

  @patch('/combo-groups')
  @response(200, {
    description: 'ComboGroup PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ComboGroup, {partial: true}),
        },
      },
    })
    comboGroup: ComboGroup,
    @param.where(ComboGroup) where?: Where<ComboGroup>,
  ): Promise<Count> {
    return this.comboGroupRepository.updateAll(comboGroup, where);
  }

  @get('/combo-groups/{id}')
  @response(200, {
    description: 'ComboGroup model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ComboGroup, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ComboGroup, {exclude: 'where'}) filter?: FilterExcludingWhere<ComboGroup>
  ): Promise<ComboGroup> {
    return this.comboGroupRepository.findById(id, filter);
  }

  @patch('/combo-groups/{id}')
  @response(204, {
    description: 'ComboGroup PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ComboGroup, {partial: true}),
        },
      },
    })
    comboGroup: ComboGroup,
  ): Promise<void> {
    await this.comboGroupRepository.updateById(id, comboGroup);
  }

  @put('/combo-groups/{id}')
  @response(204, {
    description: 'ComboGroup PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() comboGroup: ComboGroup,
  ): Promise<void> {
    await this.comboGroupRepository.replaceById(id, comboGroup);
  }

  @del('/combo-groups/{id}')
  @response(204, {
    description: 'ComboGroup DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.comboGroupRepository.deleteById(id);
  }
}
