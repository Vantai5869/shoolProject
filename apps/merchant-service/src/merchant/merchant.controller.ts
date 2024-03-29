import { BookingProto, MerchantProto, UserProto } from '@libs/grpc-types';
import {
  Branch,
  BranchPagination,
  Branches,
  CreateBranchInput,
  NullableBranch,
  UpdateBranchInput,
} from '@libs/grpc-types/protos/branch';
import { Count, EUserRole, Id, QueryRequest } from '@libs/grpc-types/protos/commons';
import { CreateInput, Feedback, ItemPagination, NullableItem, UpdateInput } from '@libs/grpc-types/protos/feedback';
import {
  CreateGroupInput,
  Group,
  GroupPagination,
  NullableGroup,
  UpdateGroupInput,
} from '@libs/grpc-types/protos/group';
import { CreateServiceInput, NullableService, Service, UpdateServiceInput } from '@libs/grpc-types/protos/service';
import { GrpcLogInterceptor } from '@libs/interceptors';
import { Controller, Inject, OnModuleInit, UseFilters, UseInterceptors } from '@nestjs/common';
import { GrpcAllExceptionsFilter } from 'filters/filters';
import { Observable } from 'rxjs';
import { UserServiceClient } from '@libs/grpc-types/protos/user';
import { BookingServiceClient } from '@libs/grpc-types/protos/booking';
import { ClientGrpc } from '@nestjs/microservices';

import { BranchService } from '../branch/branch.service';
import { FeedbackService } from '../feedback/feedback.service';
import { GroupService } from '../group/group.service';
import { ServicesService } from '../service/service.service';

import { MerchantService } from './merchant.service';

@UseFilters(GrpcAllExceptionsFilter)
@UseInterceptors(GrpcLogInterceptor)
@Controller()
@MerchantProto.MerchantServiceControllerMethods()
export class MerchantController implements MerchantProto.MerchantServiceController, OnModuleInit {
  private userService: UserServiceClient;
  private bookingService: BookingServiceClient;

  constructor(
    private readonly merchantService: MerchantService,
    private readonly branchService: BranchService,
    private readonly groupService: GroupService,
    private readonly servicesService: ServicesService,
    private readonly feedbackService: FeedbackService,
    @Inject(UserProto.DUCPH_USER_PACKAGE_NAME) private userClient: ClientGrpc,
    @Inject(BookingProto.BOOKING_PACKAGE_NAME) private bookingClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.userClient.getService<UserServiceClient>(UserProto.USER_SERVICE_NAME);
    this.bookingService = this.bookingClient.getService<BookingServiceClient>(BookingProto.BOOKING_SERVICE_NAME);
  }

  async overviewStatistic(request: QueryRequest): Promise<MerchantProto.OverviewStatistic> {
    const whereRequest = JSON.parse(request.where);

    const [branch, group, service] = await Promise.all([
      this.branchService.count(request),
      this.groupService.count(request),
      this.servicesService.count(request),
    ]);

    const booking = await this.bookingService.count(request).toPromise();
    const { count } = await this.userService
      .count({
        ...request,
        where: JSON.stringify({
          ...whereRequest,
          role: {
            _not: EUserRole.USER,
          },
        }),
      })
      .toPromise();

    return {
      branch,
      group,
      service,
      operator: count,
      customer: booking.count,
      booking: booking.count,
    };
  }

  async groups(request: QueryRequest): Promise<GroupPagination> {
    const result = await this.groupService.findWithPaging(request);

    return result;
  }

  findAll(
    request: QueryRequest,
  ): MerchantProto.Merchants | Promise<MerchantProto.Merchants> | Observable<MerchantProto.Merchants> {
    throw new Error('Method not implemented.');
  }

  async findBranches(request: QueryRequest): Promise<BranchPagination> {
    return await this.branchService.findWithPaging(request);
  }

  async find(request: QueryRequest): Promise<MerchantProto.MerchantPagination> {
    const merchants = await this.merchantService.findWithPaging(request);
    return merchants;
  }

  async findOne(request: QueryRequest): Promise<MerchantProto.NullableMerchant> {
    const merchant = await this.merchantService.findOne(request);
    return { merchant };
  }

  async create(request: MerchantProto.CreateInput): Promise<MerchantProto.CreateMerchantResponse> {
    const res = await this.merchantService.create(request);
    return res;
  }

  count(request: QueryRequest): Count | Observable<Count> | Promise<Count> {
    throw new Error('Method not implemented.');
  }

  async findById(id: Id): Promise<MerchantProto.NullableMerchant> {
    const merchant = await this.merchantService.findById(id.id);
    return { merchant };
  }

  async branch(request: QueryRequest): Promise<NullableBranch> {
    const branch = await this.branchService.findOne({
      where: JSON.parse(request.where),
    });

    return { branch };
  }

  async branches(request: QueryRequest): Promise<Branches> {
    const branches = await this.branchService.find(request);
    return { branches };
  }

  async findBranchById(request: Id): Promise<NullableBranch> {
    const branch = await this.branchService.findById(request.id);
    return { branch };
  }

  async createBranch(request: CreateBranchInput): Promise<Branch> {
    const branch = await this.branchService.create(request);
    return branch;
  }

  async updateBranch(request: UpdateBranchInput): Promise<Branch> {
    const branch = await this.branchService.update(request);
    return branch;
  }

  async deleteBranch(request: Id): Promise<Count> {
    const count = await this.branchService.delete(request.id);
    return { count };
  }

  group(request: QueryRequest): NullableGroup | Promise<NullableGroup> | Observable<NullableGroup> {
    throw new Error('Method not implemented.');
  }

  findGroupById(request: Id): NullableGroup | Promise<NullableGroup> | Observable<NullableGroup> {
    throw new Error('Method not implemented.');
  }

  async createGroup(request: CreateGroupInput): Promise<Group> {
    const group = await this.groupService.create(request);

    return group;
  }

  async updateGroup(request: UpdateGroupInput): Promise<Group> {
    const group = await this.groupService.update(request);

    return group;
  }

  async deleteGroup(request: Id): Promise<Count> {
    const count = await this.groupService.delete(request.id);
    return { count };
  }

  async service(request: QueryRequest): Promise<NullableService> {
    const service = await this.servicesService.findOne({
      where: JSON.parse(request.where),
    });

    return { service };
  }

  async services(request: QueryRequest) {
    const service = await this.servicesService.findWithPaging(request);

    return service;
  }

  async findServiceById(request: Id): Promise<NullableService> {
    const service = await this.servicesService.findById(request.id);

    return { service };
  }

  async createService(request: CreateServiceInput): Promise<Service> {
    const service = await this.servicesService.create(request);

    return service;
  }

  async updateService(request: UpdateServiceInput): Promise<Service> {
    const service = await this.servicesService.update(request);

    return service;
  }

  async deleteService(request: Id): Promise<Count> {
    const count = await this.servicesService.delete(request.id);
    return { count };
  }

  async feedback(request: QueryRequest): Promise<NullableItem> {
    const feedback = await this.servicesService.findOne({
      where: JSON.parse(request.where),
    });

    return { feedback };
  }

  async feedbacks(request: QueryRequest): Promise<ItemPagination> {
    const result = await this.feedbackService.findWithPaging(request);

    return result;
  }

  async findFeedbackById(request: Id): Promise<NullableItem> {
    const feedback = await this.feedbackService.findById(request.id);

    return { feedback };
  }

  async createFeedback(request: CreateInput): Promise<Feedback> {
    const feedback = await this.feedbackService.create(request);

    return feedback;
  }

  async updateFeedback(request: UpdateInput): Promise<Feedback> {
    const service = await this.feedbackService.update(request);

    return service;
  }

  async deleteFeedback(request: Id): Promise<Count> {
    const count = await this.feedbackService.delete(request.id);
    return { count };
  }
}
