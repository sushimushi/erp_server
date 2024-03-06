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
import {CustomAdditionalDetails} from '../models';
import {CustomAdditionalDetailsRepository} from '../repositories';

export class CustomAdditionalDetailsController {
  constructor(
    @repository(CustomAdditionalDetailsRepository)
    public customAdditionalDetailsRepository : CustomAdditionalDetailsRepository,
  ) {}

  @post('/custom-additional-details')
  @response(200, {
    description: 'CustomAdditionalDetails model instance',
    content: {'application/json': {schema: getModelSchemaRef(CustomAdditionalDetails)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomAdditionalDetails, {
            title: 'NewCustomAdditionalDetails',
            exclude: ['customAdditionalDetailsId'],
          }),
        },
      },
    })
    customAdditionalDetails: Omit<CustomAdditionalDetails, 'customAdditionalDetailsId'>,
  ): Promise<CustomAdditionalDetails> {
    return this.customAdditionalDetailsRepository.create(customAdditionalDetails);
  }

  @get('/custom-additional-details/count')
  @response(200, {
    description: 'CustomAdditionalDetails model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CustomAdditionalDetails) where?: Where<CustomAdditionalDetails>,
  ): Promise<Count> {
    return this.customAdditionalDetailsRepository.count(where);
  }

  @get('/custom-additional-details')
  @response(200, {
    description: 'Array of CustomAdditionalDetails model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CustomAdditionalDetails, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CustomAdditionalDetails) filter?: Filter<CustomAdditionalDetails>,
  ): Promise<CustomAdditionalDetails[]> {
    return this.customAdditionalDetailsRepository.find(filter);
  }

  @patch('/custom-additional-details')
  @response(200, {
    description: 'CustomAdditionalDetails PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomAdditionalDetails, {partial: true}),
        },
      },
    })
    customAdditionalDetails: CustomAdditionalDetails,
    @param.where(CustomAdditionalDetails) where?: Where<CustomAdditionalDetails>,
  ): Promise<Count> {
    return this.customAdditionalDetailsRepository.updateAll(customAdditionalDetails, where);
  }

  @get('/custom-additional-details/{id}')
  @response(200, {
    description: 'CustomAdditionalDetails model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CustomAdditionalDetails, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CustomAdditionalDetails, {exclude: 'where'}) filter?: FilterExcludingWhere<CustomAdditionalDetails>
  ): Promise<CustomAdditionalDetails> {
    return this.customAdditionalDetailsRepository.findById(id, filter);
  }

  @patch('/custom-additional-details/{id}')
  @response(204, {
    description: 'CustomAdditionalDetails PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomAdditionalDetails, {partial: true}),
        },
      },
    })
    customAdditionalDetails: CustomAdditionalDetails,
  ): Promise<void> {
    await this.customAdditionalDetailsRepository.updateById(id, customAdditionalDetails);
  }

  @put('/custom-additional-details/{id}')
  @response(204, {
    description: 'CustomAdditionalDetails PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() customAdditionalDetails: CustomAdditionalDetails,
  ): Promise<void> {
    await this.customAdditionalDetailsRepository.replaceById(id, customAdditionalDetails);
  }

  @del('/custom-additional-details/{id}')
  @response(204, {
    description: 'CustomAdditionalDetails DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.customAdditionalDetailsRepository.deleteById(id);
  }
}
