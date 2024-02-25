import {authenticate} from '@loopback/authentication';
import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Booking,
  Receipt,
} from '../models';
import {BookingRepository} from '../repositories';

export class BookingReceiptController {
  constructor(
    @repository(BookingRepository)
    public bookingRepository: BookingRepository,
  ) { }

  @authenticate('jwt')
  @get('/bookings/{id}/receipt', {
    responses: {
      '200': {
        description: 'Receipt belonging to Booking',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Receipt),
          },
        },
      },
    },
  })
  async getReceipt(
    @param.path.string('id') id: typeof Booking.prototype.bookingId,
  ): Promise<Receipt> {
    return this.bookingRepository.receipt(id);
  }
}
