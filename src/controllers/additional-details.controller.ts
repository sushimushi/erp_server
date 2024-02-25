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
import {AdditionalDetails} from '../models';
import {AdditionalDetailsRepository} from '../repositories';

export class AdditionalDetailsController {
  constructor(
    @repository(AdditionalDetailsRepository)
    public additionalDetailsRepository : AdditionalDetailsRepository,
  ) {}

  @authenticate('jwt')
  @authenticate('jwt')
  @post('/additional-details')
  @response(200, {
    description: 'AdditionalDetails model instance',
    content: {'application/json': {schema: getModelSchemaRef(AdditionalDetails)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalDetails, {
            title: 'NewAdditionalDetails',
            exclude: ['additionalDetailId'],
          }),
        },
      },
    })
    additionalDetails: Omit<AdditionalDetails, 'additionalDetailId'>,
  ): Promise<AdditionalDetails> {
    return this.additionalDetailsRepository.create(additionalDetails);
  }

  @authenticate('jwt')
  @get('/additional-details/count')
  @response(200, {
    description: 'AdditionalDetails model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AdditionalDetails) where?: Where<AdditionalDetails>,
  ): Promise<Count> {
    return this.additionalDetailsRepository.count(where);
  }

  @authenticate('jwt')
  @get('/additional-details')
  @response(200, {
    description: 'Array of AdditionalDetails model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AdditionalDetails, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AdditionalDetails) filter?: Filter<AdditionalDetails>,
  ): Promise<AdditionalDetails[]> {
    return this.additionalDetailsRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/additional-details')
  @response(200, {
    description: 'AdditionalDetails PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalDetails, {partial: true}),
        },
      },
    })
    additionalDetails: AdditionalDetails,
    @param.where(AdditionalDetails) where?: Where<AdditionalDetails>,
  ): Promise<Count> {
    return this.additionalDetailsRepository.updateAll(additionalDetails, where);
  }

  @authenticate('jwt')
  @get('/additional-details/{id}')
  @response(200, {
    description: 'AdditionalDetails model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AdditionalDetails, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AdditionalDetails, {exclude: 'where'}) filter?: FilterExcludingWhere<AdditionalDetails>
  ): Promise<AdditionalDetails> {
    return this.additionalDetailsRepository.findById(id, filter);
  }


  @authenticate('jwt')
  @patch('/additional-details/{id}')
  @response(204, {
    description: 'AdditionalDetails PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalDetails, {partial: true}),
        },
      },
    })
    additionalDetails: AdditionalDetails,
  ): Promise<void> {
    await this.additionalDetailsRepository.updateById(id, additionalDetails);
  }

  @authenticate('jwt')
  @put('/additional-details/{id}')
  @response(204, {
    description: 'AdditionalDetails PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() additionalDetails: AdditionalDetails,
  ): Promise<void> {
    await this.additionalDetailsRepository.replaceById(id, additionalDetails);
  }

  @authenticate('jwt')
  @del('/additional-details/{id}')
  @response(204, {
    description: 'AdditionalDetails DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.additionalDetailsRepository.deleteById(id);
  }
}
