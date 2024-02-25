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
  Order,
  Booking,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderBookingController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @authenticate('jwt')
  @get('/orders/{id}/booking', {
    responses: {
      '200': {
        description: 'Order has one Booking',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Booking),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Booking>,
  ): Promise<Booking> {
    return this.orderRepository.booking(id).get(filter);
  }

  @authenticate('jwt')
  @post('/orders/{id}/booking', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(Booking)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Order.prototype.orderId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Booking, {
            title: 'NewBookingInOrder',
            exclude: ['bookingId'],
            optional: ['receiptId']
          }),
        },
      },
    }) booking: Omit<Booking, 'bookingId'>,
  ): Promise<Booking> {
    return this.orderRepository.booking(id).create(booking);
  }

  @authenticate('jwt')
  @patch('/orders/{id}/booking', {
    responses: {
      '200': {
        description: 'Order.Booking PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Booking, {partial: true}),
        },
      },
    })
    booking: Partial<Booking>,
    @param.query.object('where', getWhereSchemaFor(Booking)) where?: Where<Booking>,
  ): Promise<Count> {
    return this.orderRepository.booking(id).patch(booking, where);
  }

  @authenticate('jwt')
  @del('/orders/{id}/booking', {
    responses: {
      '200': {
        description: 'Order.Booking DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Booking)) where?: Where<Booking>,
  ): Promise<Count> {
    return this.orderRepository.booking(id).delete(where);
  }
}
