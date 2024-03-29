import { DeviceProto } from '@libs/grpc-types';
import { Count, Id, QueryRequest } from '@libs/grpc-types/protos/commons';
import { CreateDeviceInput, Devices } from '@libs/grpc-types/protos/device';
import {
  AddOperatorInput,
  AdminUpdateCustomerInput,
  CreateUserRequest,
  DUCPH_USER_PACKAGE_NAME,
  FindOneUser,
  USER_SERVICE_NAME,
  UpdateUserData,
  UserServiceClient,
} from '@libs/grpc-types/protos/user';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserCommonService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(DUCPH_USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async create(data: CreateUserRequest): Promise<FindOneUser> {
    return await firstValueFrom(this.userService.create(data));
  }

  async find(query: QueryRequest) {
    return await firstValueFrom(this.userService.find(query));
  }

  async findOne(query: QueryRequest) {
    return await firstValueFrom(this.userService.findOne(query));
  }

  async findById(id: Id) {
    return await firstValueFrom(this.userService.findById(id));
  }

  async countUser(query: QueryRequest) {
    return await firstValueFrom(this.userService.count(query));
  }

  async update(id: number, data: UpdateUserData) {
    return await firstValueFrom(
      this.userService.update({
        id,
        data,
      }),
    );
  }

  async deleteCustomer(id: number): Promise<Count> {
    return await firstValueFrom(this.userService.deleteCustomer({ id }));
  }

  async findDevices(query: QueryRequest): Promise<Devices> {
    return await firstValueFrom(this.userService.findDevices(query));
  }

  async upsertDevice(data: CreateDeviceInput): Promise<DeviceProto.Device> {
    return await firstValueFrom(this.userService.upsertDevice(data));
  }

  async addOperator(data: AddOperatorInput): Promise<FindOneUser> {
    return await firstValueFrom(this.userService.addOperator(data));
  }

  async countCustomer(query: QueryRequest) {
    return await firstValueFrom(this.userService.countCustomer(query));
  }

  // customer
  async addCustomer(data: AddOperatorInput): Promise<FindOneUser> {
    return await firstValueFrom(this.userService.addCustomer(data));
  }

  async updateCustomer(data: AdminUpdateCustomerInput): Promise<FindOneUser> {
    return await firstValueFrom(this.userService.updateCustomer(data));
  }
}
