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
Product,
ProductAddonGroup,
AddonGroup,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductAddonGroupController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/addon-groups', {
    responses: {
      '200': {
        description: 'Array of Product has many AddonGroup through ProductAddonGroup',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AddonGroup)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<AddonGroup>,
  ): Promise<AddonGroup[]> {
    return this.productRepository.productAddonGroup(id).find(filter);
  }

  @post('/products/{id}/addon-groups', {
    responses: {
      '200': {
        description: 'create a AddonGroup model instance',
        content: {'application/json': {schema: getModelSchemaRef(AddonGroup)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.productId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AddonGroup, {
            title: 'NewAddonGroupInProduct',
            exclude: ['addonGroupId'],
          }),
        },
      },
    }) addonGroup: Omit<AddonGroup, 'addonGroupId'>,
  ): Promise<AddonGroup> {
    return this.productRepository.productAddonGroup(id).create(addonGroup);
  }

  @patch('/products/{id}/addon-groups', {
    responses: {
      '200': {
        description: 'Product.AddonGroup PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AddonGroup, {partial: true}),
        },
      },
    })
    addonGroup: Partial<AddonGroup>,
    @param.query.object('where', getWhereSchemaFor(AddonGroup)) where?: Where<AddonGroup>,
  ): Promise<Count> {
    return this.productRepository.productAddonGroup(id).patch(addonGroup, where);
  }

  @del('/products/{id}/addon-groups', {
    responses: {
      '200': {
        description: 'Product.AddonGroup DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AddonGroup)) where?: Where<AddonGroup>,
  ): Promise<Count> {
    return this.productRepository.productAddonGroup(id).delete(where);
  }
}
