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
ProductTaxGroup,
TaxGroup,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductTaxGroupController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/tax-groups', {
    responses: {
      '200': {
        description: 'Array of Product has many TaxGroup through ProductTaxGroup',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TaxGroup)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TaxGroup>,
  ): Promise<TaxGroup[]> {
    return this.productRepository.taxGroups(id).find(filter);
  }

  @post('/products/{id}/tax-groups', {
    responses: {
      '200': {
        description: 'create a TaxGroup model instance',
        content: {'application/json': {schema: getModelSchemaRef(TaxGroup)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.productId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaxGroup, {
            title: 'NewTaxGroupInProduct',
            exclude: ['taxGroupId'],
          }),
        },
      },
    }) taxGroup: Omit<TaxGroup, 'taxGroupId'>,
  ): Promise<TaxGroup> {
    return this.productRepository.taxGroups(id).create(taxGroup);
  }

  @patch('/products/{id}/tax-groups', {
    responses: {
      '200': {
        description: 'Product.TaxGroup PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaxGroup, {partial: true}),
        },
      },
    })
    taxGroup: Partial<TaxGroup>,
    @param.query.object('where', getWhereSchemaFor(TaxGroup)) where?: Where<TaxGroup>,
  ): Promise<Count> {
    return this.productRepository.taxGroups(id).patch(taxGroup, where);
  }

  @del('/products/{id}/tax-groups', {
    responses: {
      '200': {
        description: 'Product.TaxGroup DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TaxGroup)) where?: Where<TaxGroup>,
  ): Promise<Count> {
    return this.productRepository.taxGroups(id).delete(where);
  }
}
