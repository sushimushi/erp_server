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
import {Printer} from '../models';
import {PrinterRepository} from '../repositories';

export class PrinterController {
  constructor(
    @repository(PrinterRepository)
    public printerRepository : PrinterRepository,
  ) {}

  @authenticate('jwt')
  @post('/printers')
  @response(200, {
    description: 'Printer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Printer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Printer, {
            title: 'NewPrinter',
            exclude: ['printerId'],
          }),
        },
      },
    })
    printer: Omit<Printer, 'printerId'>,
  ): Promise<Printer> {
    return this.printerRepository.create(printer);
  }

  @get('/printers/count')
  @response(200, {
    description: 'Printer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Printer) where?: Where<Printer>,
  ): Promise<Count> {
    return this.printerRepository.count(where);
  }

  @get('/printers')
  @response(200, {
    description: 'Array of Printer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Printer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Printer) filter?: Filter<Printer>,
  ): Promise<Printer[]> {
    return this.printerRepository.find(filter);
  }

  @patch('/printers')
  @response(200, {
    description: 'Printer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Printer, {partial: true}),
        },
      },
    })
    printer: Printer,
    @param.where(Printer) where?: Where<Printer>,
  ): Promise<Count> {
    return this.printerRepository.updateAll(printer, where);
  }

  @get('/printers/{id}')
  @response(200, {
    description: 'Printer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Printer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Printer, {exclude: 'where'}) filter?: FilterExcludingWhere<Printer>
  ): Promise<Printer> {
    return this.printerRepository.findById(id, filter);
  }

  @patch('/printers/{id}')
  @response(204, {
    description: 'Printer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Printer, {partial: true}),
        },
      },
    })
    printer: Printer,
  ): Promise<void> {
    await this.printerRepository.updateById(id, printer);
  }

  @put('/printers/{id}')
  @response(204, {
    description: 'Printer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() printer: Printer,
  ): Promise<void> {
    await this.printerRepository.replaceById(id, printer);
  }

  @del('/printers/{id}')
  @response(204, {
    description: 'Printer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.printerRepository.deleteById(id);
  }
}
