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
import {VariantGroup} from '../models';
import {VariantGroupRepository} from '../repositories';

export class VariantGroupController {
  constructor(
    @repository(VariantGroupRepository)
    public variantGroupRepository : VariantGroupRepository,
  ) {}

  @post('/variant-groups')
  @response(200, {
    description: 'VariantGroup model instance',
    content: {'application/json': {schema: getModelSchemaRef(VariantGroup)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VariantGroup, {
            title: 'NewVariantGroup',
            exclude: ['variantGroupId'],
          }),
        },
      },
    })
    variantGroup: Omit<VariantGroup, 'variantGroupId'>,
  ): Promise<VariantGroup> {
    return this.variantGroupRepository.create(variantGroup);
  }

  @get('/variant-groups/count')
  @response(200, {
    description: 'VariantGroup model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VariantGroup) where?: Where<VariantGroup>,
  ): Promise<Count> {
    return this.variantGroupRepository.count(where);
  }

  @get('/variant-groups')
  @response(200, {
    description: 'Array of VariantGroup model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VariantGroup, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VariantGroup) filter?: Filter<VariantGroup>,
  ): Promise<VariantGroup[]> {
    return this.variantGroupRepository.find(filter);
  }

  @patch('/variant-groups')
  @response(200, {
    description: 'VariantGroup PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VariantGroup, {partial: true}),
        },
      },
    })
    variantGroup: VariantGroup,
    @param.where(VariantGroup) where?: Where<VariantGroup>,
  ): Promise<Count> {
    return this.variantGroupRepository.updateAll(variantGroup, where);
  }

  @get('/variant-groups/{id}')
  @response(200, {
    description: 'VariantGroup model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VariantGroup, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VariantGroup, {exclude: 'where'}) filter?: FilterExcludingWhere<VariantGroup>
  ): Promise<VariantGroup> {
    return this.variantGroupRepository.findById(id, filter);
  }

  @patch('/variant-groups/{id}')
  @response(204, {
    description: 'VariantGroup PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VariantGroup, {partial: true}),
        },
      },
    })
    variantGroup: VariantGroup,
  ): Promise<void> {
    await this.variantGroupRepository.updateById(id, variantGroup);
  }

  @put('/variant-groups/{id}')
  @response(204, {
    description: 'VariantGroup PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() variantGroup: VariantGroup,
  ): Promise<void> {
    await this.variantGroupRepository.replaceById(id, variantGroup);
  }

  @del('/variant-groups/{id}')
  @response(204, {
    description: 'VariantGroup DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.variantGroupRepository.deleteById(id);
  }
}
