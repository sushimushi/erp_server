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
import {Addon} from '../models';
import {AddonRepository} from '../repositories';

export class AddonController {
  constructor(
    @repository(AddonRepository)
    public addonRepository : AddonRepository,
  ) {}

  @authenticate('jwt')
  @post('/addons')
  @response(200, {
    description: 'Addon model instance',
    content: {'application/json': {schema: getModelSchemaRef(Addon)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Addon, {
            title: 'NewAddon',
            exclude: ['addonId'],
          }),
        },
      },
    })
    addon: Omit<Addon, 'addonId'>,
  ): Promise<Addon> {
    return this.addonRepository.create(addon);
  }

  @get('/addons/count')
  @response(200, {
    description: 'Addon model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Addon) where?: Where<Addon>,
  ): Promise<Count> {
    return this.addonRepository.count(where);
  }

  @get('/addons')
  @response(200, {
    description: 'Array of Addon model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Addon, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Addon) filter?: Filter<Addon>,
  ): Promise<Addon[]> {
    return this.addonRepository.find(filter);
  }

  @patch('/addons')
  @response(200, {
    description: 'Addon PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Addon, {partial: true}),
        },
      },
    })
    addon: Addon,
    @param.where(Addon) where?: Where<Addon>,
  ): Promise<Count> {
    return this.addonRepository.updateAll(addon, where);
  }

  @get('/addons/{id}')
  @response(200, {
    description: 'Addon model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Addon, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Addon, {exclude: 'where'}) filter?: FilterExcludingWhere<Addon>
  ): Promise<Addon> {
    return this.addonRepository.findById(id, filter);
  }

  @patch('/addons/{id}')
  @response(204, {
    description: 'Addon PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Addon, {partial: true}),
        },
      },
    })
    addon: Addon,
  ): Promise<void> {
    await this.addonRepository.updateById(id, addon);
  }

  @put('/addons/{id}')
  @response(204, {
    description: 'Addon PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() addon: Addon,
  ): Promise<void> {
    await this.addonRepository.replaceById(id, addon);
  }

  @del('/addons/{id}')
  @response(204, {
    description: 'Addon DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.addonRepository.deleteById(id);
  }
}
