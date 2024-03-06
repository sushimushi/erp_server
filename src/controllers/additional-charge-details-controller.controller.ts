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
import {AdditionalChargeDetails} from '../models';
import {AdditionalChargeDetailsRepository} from '../repositories';

export class AdditionalChargeDetailsControllerController {
  constructor(
    @repository(AdditionalChargeDetailsRepository)
    public additionalChargeDetailsRepository : AdditionalChargeDetailsRepository,
  ) {}

  @post('/additional-charge-details')
  @response(200, {
    description: 'AdditionalChargeDetails model instance',
    content: {'application/json': {schema: getModelSchemaRef(AdditionalChargeDetails)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalChargeDetails, {
            title: 'NewAdditionalChargeDetails',
            exclude: ['additionalChargeDetailsId'],
          }),
        },
      },
    })
    additionalChargeDetails: Omit<AdditionalChargeDetails, 'additionalChargeDetailsId'>,
  ): Promise<AdditionalChargeDetails> {
    return this.additionalChargeDetailsRepository.create(additionalChargeDetails);
  }

  @get('/additional-charge-details/count')
  @response(200, {
    description: 'AdditionalChargeDetails model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AdditionalChargeDetails) where?: Where<AdditionalChargeDetails>,
  ): Promise<Count> {
    return this.additionalChargeDetailsRepository.count(where);
  }

  @get('/additional-charge-details')
  @response(200, {
    description: 'Array of AdditionalChargeDetails model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AdditionalChargeDetails, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AdditionalChargeDetails) filter?: Filter<AdditionalChargeDetails>,
  ): Promise<AdditionalChargeDetails[]> {
    return this.additionalChargeDetailsRepository.find(filter);
  }

  @patch('/additional-charge-details')
  @response(200, {
    description: 'AdditionalChargeDetails PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalChargeDetails, {partial: true}),
        },
      },
    })
    additionalChargeDetails: AdditionalChargeDetails,
    @param.where(AdditionalChargeDetails) where?: Where<AdditionalChargeDetails>,
  ): Promise<Count> {
    return this.additionalChargeDetailsRepository.updateAll(additionalChargeDetails, where);
  }

  @get('/additional-charge-details/{id}')
  @response(200, {
    description: 'AdditionalChargeDetails model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AdditionalChargeDetails, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AdditionalChargeDetails, {exclude: 'where'}) filter?: FilterExcludingWhere<AdditionalChargeDetails>
  ): Promise<AdditionalChargeDetails> {
    return this.additionalChargeDetailsRepository.findById(id, filter);
  }

  @patch('/additional-charge-details/{id}')
  @response(204, {
    description: 'AdditionalChargeDetails PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalChargeDetails, {partial: true}),
        },
      },
    })
    additionalChargeDetails: AdditionalChargeDetails,
  ): Promise<void> {
    await this.additionalChargeDetailsRepository.updateById(id, additionalChargeDetails);
  }

  @put('/additional-charge-details/{id}')
  @response(204, {
    description: 'AdditionalChargeDetails PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() additionalChargeDetails: AdditionalChargeDetails,
  ): Promise<void> {
    await this.additionalChargeDetailsRepository.replaceById(id, additionalChargeDetails);
  }

  @del('/additional-charge-details/{id}')
  @response(204, {
    description: 'AdditionalChargeDetails DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.additionalChargeDetailsRepository.deleteById(id);
  }
}
