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
ProductAdditionalDetails,
AdditionalDetails,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductAdditionalDetailsController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/additional-details', {
    responses: {
      '200': {
        description: 'Array of Product has many AdditionalDetails through ProductAdditionalDetails',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AdditionalDetails)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<AdditionalDetails>,
  ): Promise<AdditionalDetails[]> {
    return this.productRepository.additionalDetails(id).find(filter);
  }

  @post('/products/{id}/additional-details', {
    responses: {
      '200': {
        description: 'create a AdditionalDetails model instance',
        content: {'application/json': {schema: getModelSchemaRef(AdditionalDetails)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.productId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalDetails, {
            title: 'NewAdditionalDetailsInProduct',
            exclude: ['additionalDetailId'],
          }),
        },
      },
    }) additionalDetails: Omit<AdditionalDetails, 'additionalDetailId'>,
  ): Promise<AdditionalDetails> {
    return this.productRepository.additionalDetails(id).create(additionalDetails);
  }

  @patch('/products/{id}/additional-details', {
    responses: {
      '200': {
        description: 'Product.AdditionalDetails PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalDetails, {partial: true}),
        },
      },
    })
    additionalDetails: Partial<AdditionalDetails>,
    @param.query.object('where', getWhereSchemaFor(AdditionalDetails)) where?: Where<AdditionalDetails>,
  ): Promise<Count> {
    return this.productRepository.additionalDetails(id).patch(additionalDetails, where);
  }

  @del('/products/{id}/additional-details', {
    responses: {
      '200': {
        description: 'Product.AdditionalDetails DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AdditionalDetails)) where?: Where<AdditionalDetails>,
  ): Promise<Count> {
    return this.productRepository.additionalDetails(id).delete(where);
  }
}
