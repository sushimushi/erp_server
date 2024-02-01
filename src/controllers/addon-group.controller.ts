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
import {AddonGroup} from '../models';
import {AddonGroupRepository} from '../repositories';

export class AddonGroupController {
  constructor(
    @repository(AddonGroupRepository)
    public addonGroupRepository : AddonGroupRepository,
  ) {}

  @post('/addon-groups')
  @response(200, {
    description: 'AddonGroup model instance',
    content: {'application/json': {schema: getModelSchemaRef(AddonGroup)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AddonGroup, {
            title: 'NewAddonGroup',
            exclude: ['addonGroupId'],
          }),
        },
      },
    })
    addonGroup: Omit<AddonGroup, 'addonGroupId'>,
  ): Promise<AddonGroup> {
    return this.addonGroupRepository.create(addonGroup);
  }

  @get('/addon-groups/count')
  @response(200, {
    description: 'AddonGroup model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AddonGroup) where?: Where<AddonGroup>,
  ): Promise<Count> {
    return this.addonGroupRepository.count(where);
  }

  @get('/addon-groups')
  @response(200, {
    description: 'Array of AddonGroup model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AddonGroup, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AddonGroup) filter?: Filter<AddonGroup>,
  ): Promise<AddonGroup[]> {
    return this.addonGroupRepository.find(filter);
  }

  @patch('/addon-groups')
  @response(200, {
    description: 'AddonGroup PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AddonGroup, {partial: true}),
        },
      },
    })
    addonGroup: AddonGroup,
    @param.where(AddonGroup) where?: Where<AddonGroup>,
  ): Promise<Count> {
    return this.addonGroupRepository.updateAll(addonGroup, where);
  }

  @get('/addon-groups/{id}')
  @response(200, {
    description: 'AddonGroup model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AddonGroup, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AddonGroup, {exclude: 'where'}) filter?: FilterExcludingWhere<AddonGroup>
  ): Promise<AddonGroup> {
    return this.addonGroupRepository.findById(id, filter);
  }

  @patch('/addon-groups/{id}')
  @response(204, {
    description: 'AddonGroup PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AddonGroup, {partial: true}),
        },
      },
    })
    addonGroup: AddonGroup,
  ): Promise<void> {
    await this.addonGroupRepository.updateById(id, addonGroup);
  }

  @put('/addon-groups/{id}')
  @response(204, {
    description: 'AddonGroup PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() addonGroup: AddonGroup,
  ): Promise<void> {
    await this.addonGroupRepository.replaceById(id, addonGroup);
  }

  @del('/addon-groups/{id}')
  @response(204, {
    description: 'AddonGroup DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.addonGroupRepository.deleteById(id);
  }
}
