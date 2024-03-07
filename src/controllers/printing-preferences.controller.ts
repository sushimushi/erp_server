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
import {PrintingPreferences} from '../models';
import {PrintingPreferencesRepository} from '../repositories';

export class PrintingPreferencesController {
  constructor(
    @repository(PrintingPreferencesRepository)
    public printingPreferencesRepository: PrintingPreferencesRepository,
  ) {}

  @authenticate('jwt')
  @post('/printing-preferences')
  @response(200, {
    description: 'PrintingPreferences model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(PrintingPreferences)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrintingPreferences, {
            title: 'NewPrintingPreferences',
            exclude: ['printingPreferenceId'],
          }),
        },
      },
    })
    printingPreferences: Omit<PrintingPreferences, 'printingPreferenceId'>,
  ): Promise<PrintingPreferences> {
    return this.printingPreferencesRepository.create(printingPreferences);
  }

  @get('/printing-preferences/count')
  @response(200, {
    description: 'PrintingPreferences model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PrintingPreferences) where?: Where<PrintingPreferences>,
  ): Promise<Count> {
    return this.printingPreferencesRepository.count(where);
  }

  @get('/printing-preferences')
  @response(200, {
    description: 'Array of PrintingPreferences model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PrintingPreferences, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async find(
    @param.filter(PrintingPreferences) filter?: Filter<PrintingPreferences>,
  ): Promise<PrintingPreferences[]> {
    return this.printingPreferencesRepository.find(filter);
  }

  @patch('/printing-preferences')
  @response(200, {
    description: 'PrintingPreferences PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrintingPreferences, {partial: true}),
        },
      },
    })
    printingPreferences: PrintingPreferences,
    @param.where(PrintingPreferences) where?: Where<PrintingPreferences>,
  ): Promise<Count> {
    return this.printingPreferencesRepository.updateAll(
      printingPreferences,
      where,
    );
  }

  @get('/printing-preferences/{id}')
  @response(200, {
    description: 'PrintingPreferences model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PrintingPreferences, {
          includeRelations: true,
        }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PrintingPreferences, {exclude: 'where'})
    filter?: FilterExcludingWhere<PrintingPreferences>,
  ): Promise<PrintingPreferences> {
    return this.printingPreferencesRepository.findById(id, filter);
  }

  @patch('/printing-preferences/{id}')
  @response(204, {
    description: 'PrintingPreferences PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrintingPreferences, {partial: true}),
        },
      },
    })
    printingPreferences: PrintingPreferences,
  ): Promise<void> {
    await this.printingPreferencesRepository.updateById(
      id,
      printingPreferences,
    );
  }

  @put('/printing-preferences/{id}')
  @response(204, {
    description: 'PrintingPreferences PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() printingPreferences: PrintingPreferences,
  ): Promise<void> {
    await this.printingPreferencesRepository.updateAll(printingPreferences, {
      accountId: id,
    });
  }

  @del('/printing-preferences/{id}')
  @response(204, {
    description: 'PrintingPreferences DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.printingPreferencesRepository.deleteById(id);
  }
}
