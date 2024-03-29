import { BookingProto } from '@libs/grpc-types';
import { Count, Id, QueryRequest } from '@libs/grpc-types/protos/commons';
import { GrpcLogInterceptor } from '@libs/interceptors';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { GrpcAllExceptionsFilter } from 'filters/filters';

import { BookingService } from './booking.service';

@UseFilters(GrpcAllExceptionsFilter)
@UseInterceptors(GrpcLogInterceptor)
@Controller()
@BookingProto.BookingServiceControllerMethods()
export class BookingController implements BookingProto.BookingServiceController {
  constructor(private readonly bookingService: BookingService) {}
  async findAll(request: QueryRequest): Promise<BookingProto.Bookings> {
    const items = await this.bookingService.findAll(request);
    return { items };
  }

  async find(request: QueryRequest): Promise<any> {
    return await this.bookingService.find(request);
  }

  async findById(request: Id): Promise<BookingProto.NullableBooking> {
    return await this.bookingService.findById(request.id);
  }

  async findOne(request: QueryRequest): Promise<BookingProto.NullableBooking> {
    const booking = await this.bookingService.findOne(request);
    return { booking };
  }

  async count(request: QueryRequest): Promise<Count> {
    const count = await this.bookingService.count(request);
    return { count };
  }

  async create(request: BookingProto.CreateBookingInput): Promise<BookingProto.Booking> {
    const result = await this.bookingService.create(request);

    return result;
  }

  async update(request: BookingProto.UpdateBookingInput): Promise<BookingProto.Booking> {
    return await this.bookingService.update(request);
  }

  async delete(request: Id): Promise<Count> {
    const count = await this.bookingService.delete(request.id);
    return { count };
  }
}
