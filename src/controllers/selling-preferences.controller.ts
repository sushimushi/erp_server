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
import {SellingPreferences} from '../models';
import {SellingPreferencesRepository} from '../repositories';

export class SellingPreferencesController {
  constructor(
    @repository(SellingPreferencesRepository)
    public sellingPreferencesRepository : SellingPreferencesRepository,
  ) {}

  @post('/selling-preferences')
  @response(200, {
    description: 'SellingPreferences model instance',
    content: {'application/json': {schema: getModelSchemaRef(SellingPreferences)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellingPreferences, {
            title: 'NewSellingPreferences',
            exclude: ['sellingPreferenceId'],
          }),
        },
      },
    })
    sellingPreferences: Omit<SellingPreferences, 'sellingPreferenceId'>,
  ): Promise<SellingPreferences> {
    return this.sellingPreferencesRepository.create(sellingPreferences);
  }

  @get('/selling-preferences/count')
  @response(200, {
    description: 'SellingPreferences model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SellingPreferences) where?: Where<SellingPreferences>,
  ): Promise<Count> {
    return this.sellingPreferencesRepository.count(where);
  }

  @get('/selling-preferences')
  @response(200, {
    description: 'Array of SellingPreferences model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SellingPreferences, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SellingPreferences) filter?: Filter<SellingPreferences>,
  ): Promise<SellingPreferences[]> {
    return this.sellingPreferencesRepository.find(filter);
  }

  @patch('/selling-preferences')
  @response(200, {
    description: 'SellingPreferences PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellingPreferences, {partial: true}),
        },
      },
    })
    sellingPreferences: SellingPreferences,
    @param.where(SellingPreferences) where?: Where<SellingPreferences>,
  ): Promise<Count> {
    return this.sellingPreferencesRepository.updateAll(sellingPreferences, where);
  }

  @get('/selling-preferences/{id}')
  @response(200, {
    description: 'SellingPreferences model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SellingPreferences, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SellingPreferences, {exclude: 'where'}) filter?: FilterExcludingWhere<SellingPreferences>
  ): Promise<SellingPreferences> {
    return this.sellingPreferencesRepository.findById(id, filter);
  }

  @patch('/selling-preferences/{id}')
  @response(204, {
    description: 'SellingPreferences PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellingPreferences, {partial: true}),
        },
      },
    })
    sellingPreferences: SellingPreferences,
  ): Promise<void> {
    await this.sellingPreferencesRepository.updateById(id, sellingPreferences);
  }

  @put('/selling-preferences/{id}')
  @response(204, {
    description: 'SellingPreferences PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sellingPreferences: SellingPreferences,
  ): Promise<void> {
    await this.sellingPreferencesRepository.replaceById(id, sellingPreferences);
  }

  @del('/selling-preferences/{id}')
  @response(204, {
    description: 'SellingPreferences DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sellingPreferencesRepository.deleteById(id);
  }
}
