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
import {PermissionPreferences} from '../models';
import {PermissionPreferencesRepository} from '../repositories';

export class PermissionPreferencesController {
  constructor(
    @repository(PermissionPreferencesRepository)
    public permissionPreferencesRepository: PermissionPreferencesRepository,
  ) {}

  @authenticate('jwt')
  @post('/permission-preferences')
  @response(200, {
    description: 'PermissionPreferences model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(PermissionPreferences)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PermissionPreferences, {
            title: 'NewPermissionPreferences',
            exclude: ['permissionPreferenceId'],
          }),
        },
      },
    })
    permissionPreferences: Omit<
      PermissionPreferences,
      'permissionPreferenceId'
    >,
  ): Promise<PermissionPreferences> {
    return this.permissionPreferencesRepository.create(permissionPreferences);
  }

  @get('/permission-preferences/count')
  @response(200, {
    description: 'PermissionPreferences model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PermissionPreferences) where?: Where<PermissionPreferences>,
  ): Promise<Count> {
    return this.permissionPreferencesRepository.count(where);
  }

  @get('/permission-preferences')
  @response(200, {
    description: 'Array of PermissionPreferences model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PermissionPreferences, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async find(
    @param.filter(PermissionPreferences) filter?: Filter<PermissionPreferences>,
  ): Promise<PermissionPreferences[]> {
    return this.permissionPreferencesRepository.find(filter);
  }

  @patch('/permission-preferences')
  @response(200, {
    description: 'PermissionPreferences PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PermissionPreferences, {partial: true}),
        },
      },
    })
    permissionPreferences: PermissionPreferences,
    @param.where(PermissionPreferences) where?: Where<PermissionPreferences>,
  ): Promise<Count> {
    return this.permissionPreferencesRepository.updateAll(
      permissionPreferences,
      where,
    );
  }

  @get('/permission-preferences/{id}')
  @response(200, {
    description: 'PermissionPreferences model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PermissionPreferences, {
          includeRelations: true,
        }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PermissionPreferences, {exclude: 'where'})
    filter?: FilterExcludingWhere<PermissionPreferences>,
  ): Promise<PermissionPreferences> {
    return this.permissionPreferencesRepository.findById(id, filter);
  }

  @patch('/permission-preferences/{id}')
  @response(204, {
    description: 'PermissionPreferences PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PermissionPreferences, {partial: true}),
        },
      },
    })
    permissionPreferences: PermissionPreferences,
  ): Promise<void> {
    await this.permissionPreferencesRepository.updateById(
      id,
      permissionPreferences,
    );
  }

  @put('/permission-preferences/{id}')
  @response(204, {
    description: 'PermissionPreferences PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() permissionPreferences: PermissionPreferences,
  ): Promise<void> {
    await this.permissionPreferencesRepository.updateAll(
      permissionPreferences,
      {
        accountId: id,
      },
    );
  }

  @del('/permission-preferences/{id}')
  @response(204, {
    description: 'PermissionPreferences DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.permissionPreferencesRepository.deleteById(id);
  }
}
