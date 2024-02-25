import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
AddonGroup,
// AddonGroupAddon,
Addon,
} from '../models';
import {AddonGroupRepository} from '../repositories';

export class AddonGroupAddonController {
  constructor(
    @repository(AddonGroupRepository) protected addonGroupRepository: AddonGroupRepository,
  ) { }

  @authenticate('jwt')
  @get('/addon-groups/{id}/addons', {
    responses: {
      '200': {
        description: 'Array of AddonGroup has many Addon through AddonGroupAddon',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Addon)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Addon>,
  ): Promise<Addon[]> {
    return this.addonGroupRepository.addonGroupAddon(id).find(filter);
  }

  @authenticate('jwt')
  @post('/addon-groups/{id}/addons', {
    responses: {
      '200': {
        description: 'create a Addon model instance',
        content: {'application/json': {schema: getModelSchemaRef(Addon)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof AddonGroup.prototype.addonGroupId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Addon, {
            title: 'NewAddonInAddonGroup',
            exclude: ['addonId'],
          }),
        },
      },
    }) addon: Omit<Addon, 'addonId'>,
  ): Promise<Addon> {
    return this.addonGroupRepository.addonGroupAddon(id).create(addon);
  }

  @authenticate('jwt')
  @patch('/addon-groups/{id}/addons', {
    responses: {
      '200': {
        description: 'AddonGroup.Addon PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Addon, {partial: true}),
        },
      },
    })
    addon: Partial<Addon>,
    @param.query.object('where', getWhereSchemaFor(Addon)) where?: Where<Addon>,
  ): Promise<Count> {
    return this.addonGroupRepository.addonGroupAddon(id).patch(addon, where);
  }

  @authenticate('jwt')
  @del('/addon-groups/{id}/addons', {
    responses: {
      '200': {
        description: 'AddonGroup.Addon DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Addon)) where?: Where<Addon>,
  ): Promise<Count> {
    return this.addonGroupRepository.addonGroupAddon(id).delete(where);
  }
}
