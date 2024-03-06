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
import {CustomTags} from '../models';
import {CustomTagsRepository} from '../repositories';

export class CustomTagsController {
  constructor(
    @repository(CustomTagsRepository)
    public customTagsRepository : CustomTagsRepository,
  ) {}

  @post('/custom-tags')
  @response(200, {
    description: 'CustomTags model instance',
    content: {'application/json': {schema: getModelSchemaRef(CustomTags)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomTags, {
            title: 'NewCustomTags',
            exclude: ['customTagsId'],
          }),
        },
      },
    })
    customTags: Omit<CustomTags, 'customTagsId'>,
  ): Promise<CustomTags> {
    return this.customTagsRepository.create(customTags);
  }

  @get('/custom-tags/count')
  @response(200, {
    description: 'CustomTags model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CustomTags) where?: Where<CustomTags>,
  ): Promise<Count> {
    return this.customTagsRepository.count(where);
  }

  @get('/custom-tags')
  @response(200, {
    description: 'Array of CustomTags model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CustomTags, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CustomTags) filter?: Filter<CustomTags>,
  ): Promise<CustomTags[]> {
    return this.customTagsRepository.find(filter);
  }

  @patch('/custom-tags')
  @response(200, {
    description: 'CustomTags PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomTags, {partial: true}),
        },
      },
    })
    customTags: CustomTags,
    @param.where(CustomTags) where?: Where<CustomTags>,
  ): Promise<Count> {
    return this.customTagsRepository.updateAll(customTags, where);
  }

  @get('/custom-tags/{id}')
  @response(200, {
    description: 'CustomTags model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CustomTags, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CustomTags, {exclude: 'where'}) filter?: FilterExcludingWhere<CustomTags>
  ): Promise<CustomTags> {
    return this.customTagsRepository.findById(id, filter);
  }

  @patch('/custom-tags/{id}')
  @response(204, {
    description: 'CustomTags PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomTags, {partial: true}),
        },
      },
    })
    customTags: CustomTags,
  ): Promise<void> {
    await this.customTagsRepository.updateById(id, customTags);
  }

  @put('/custom-tags/{id}')
  @response(204, {
    description: 'CustomTags PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() customTags: CustomTags,
  ): Promise<void> {
    await this.customTagsRepository.replaceById(id, customTags);
  }

  @del('/custom-tags/{id}')
  @response(204, {
    description: 'CustomTags DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.customTagsRepository.deleteById(id);
  }
}
