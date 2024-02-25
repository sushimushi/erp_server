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
import {ItemGroup} from '../models';
import {ItemGroupRepository} from '../repositories';

export class ItemGroupController {
  constructor(
    @repository(ItemGroupRepository)
    public itemGroupRepository : ItemGroupRepository,
  ) {}

  @authenticate('jwt')
  @post('/item-groups')
  @response(200, {
    description: 'ItemGroup model instance',
    content: {'application/json': {schema: getModelSchemaRef(ItemGroup)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemGroup, {
            title: 'NewItemGroup',
            exclude: ['itemGroupId'],
          }),
        },
      },
    })
    itemGroup: Omit<ItemGroup, 'itemGroupId'>,
  ): Promise<ItemGroup> {
    return this.itemGroupRepository.create(itemGroup);
  }

  @authenticate('jwt')
  @get('/item-groups/count')
  @response(200, {
    description: 'ItemGroup model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ItemGroup) where?: Where<ItemGroup>,
  ): Promise<Count> {
    return this.itemGroupRepository.count(where);
  }

  @authenticate('jwt')
  @get('/item-groups')
  @response(200, {
    description: 'Array of ItemGroup model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ItemGroup, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ItemGroup) filter?: Filter<ItemGroup>,
  ): Promise<ItemGroup[]> {
    return this.itemGroupRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/item-groups')
  @response(200, {
    description: 'ItemGroup PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemGroup, {partial: true}),
        },
      },
    })
    itemGroup: ItemGroup,
    @param.where(ItemGroup) where?: Where<ItemGroup>,
  ): Promise<Count> {
    return this.itemGroupRepository.updateAll(itemGroup, where);
  }

  @authenticate('jwt')
  @get('/item-groups/{id}')
  @response(200, {
    description: 'ItemGroup model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ItemGroup, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ItemGroup, {exclude: 'where'}) filter?: FilterExcludingWhere<ItemGroup>
  ): Promise<ItemGroup> {
    return this.itemGroupRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/item-groups/{id}')
  @response(204, {
    description: 'ItemGroup PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemGroup, {partial: true}),
        },
      },
    })
    itemGroup: ItemGroup,
  ): Promise<void> {
    await this.itemGroupRepository.updateById(id, itemGroup);
  }

  @authenticate('jwt')
  @put('/item-groups/{id}')
  @response(204, {
    description: 'ItemGroup PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() itemGroup: ItemGroup,
  ): Promise<void> {
    await this.itemGroupRepository.replaceById(id, itemGroup);
  }

  @authenticate('jwt')
  @del('/item-groups/{id}')
  @response(204, {
    description: 'ItemGroup DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.itemGroupRepository.deleteById(id);
  }
}
