/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Branch, Branches, BranchPagination, CreateBranchInput, NullableBranch, UpdateBranchInput } from "./branch";
import { Count, Id, PageMeta, QueryRequest } from "./commons";
import { CreateInput as CreateInput1, Feedback, ItemPagination, NullableItem, UpdateInput } from "./feedback";
import { NullValue } from "./google/protobuf/struct";
import { CreateGroupInput, Group, GroupPagination, NullableGroup, UpdateGroupInput } from "./group";
import { CreateServiceInput, NullableService, Service, ServicePagination, UpdateServiceInput } from "./service";

export const protobufPackage = "merchant";

export interface UpdateMerchantData {
  name?: string | undefined;
  phone?: string | undefined;
  address?: string | undefined;
  userId?: number | undefined;
  cityCode?: number | undefined;
  districtCode?: number | undefined;
  wardCode?: number | undefined;
  city?: string | undefined;
  district?: string | undefined;
  ward?: string | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
}

export interface UpdateMerchantInput {
  id: number;
  data: UpdateMerchantData | undefined;
}

export interface CreateInput {
  name?: string | undefined;
  phone?: string | undefined;
  address?: string | undefined;
  userId?: number | undefined;
  cityCode?: number | undefined;
  districtCode?: number | undefined;
  wardCode?: number | undefined;
  city?: string | undefined;
  district?: string | undefined;
  ward?: string | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
}

export interface Merchant {
  /** default field */
  id: number;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  deletedAt?: string | undefined;
  createdBy?: string | undefined;
  updatedBy?: string | undefined;
  deletedBy?:
    | string
    | undefined;
  /** reserved field */
  name?: string | undefined;
  phone?: string | undefined;
  address?: string | undefined;
  userId?: number | undefined;
  cityCode?: number | undefined;
  districtCode?: number | undefined;
  wardCode?: number | undefined;
  city?: string | undefined;
  district?: string | undefined;
  ward?: string | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
}

export interface NullableMerchant {
  null?: NullValue | undefined;
  merchant?: Merchant | undefined;
}

export interface CreateMerchantResponse {
  merchant: Merchant | undefined;
  branch: Branch | undefined;
}

export interface Merchants {
  merchants: Merchant[];
}

export interface MerchantPagination {
  items: Merchant[];
  meta?: PageMeta | undefined;
}

export interface OverviewStatistic {
  customer?: number | undefined;
  booking?: number | undefined;
  branch?: number | undefined;
  group?: number | undefined;
  service?: number | undefined;
  operator?: number | undefined;
}

export const MERCHANT_PACKAGE_NAME = "merchant";

export interface MerchantServiceClient {
  find(request: QueryRequest): Observable<MerchantPagination>;

  findAll(request: QueryRequest): Observable<Merchants>;

  findOne(request: QueryRequest): Observable<NullableMerchant>;

  create(request: CreateInput): Observable<CreateMerchantResponse>;

  count(request: QueryRequest): Observable<Count>;

  findById(request: Id): Observable<NullableMerchant>;

  /** branch */

  branch(request: QueryRequest): Observable<NullableBranch>;

  findBranches(request: QueryRequest): Observable<BranchPagination>;

  branches(request: QueryRequest): Observable<Branches>;

  findBranchById(request: Id): Observable<NullableBranch>;

  createBranch(request: CreateBranchInput): Observable<Branch>;

  updateBranch(request: UpdateBranchInput): Observable<Branch>;

  deleteBranch(request: Id): Observable<Count>;

  /** group */

  group(request: QueryRequest): Observable<NullableGroup>;

  groups(request: QueryRequest): Observable<GroupPagination>;

  findGroupById(request: Id): Observable<NullableGroup>;

  createGroup(request: CreateGroupInput): Observable<Group>;

  updateGroup(request: UpdateGroupInput): Observable<Group>;

  deleteGroup(request: Id): Observable<Count>;

  /** service */

  service(request: QueryRequest): Observable<NullableService>;

  services(request: QueryRequest): Observable<ServicePagination>;

  findServiceById(request: Id): Observable<NullableService>;

  createService(request: CreateServiceInput): Observable<Service>;

  updateService(request: UpdateServiceInput): Observable<Service>;

  deleteService(request: Id): Observable<Count>;

  /** feedback */

  feedback(request: QueryRequest): Observable<NullableItem>;

  feedbacks(request: QueryRequest): Observable<ItemPagination>;

  findFeedbackById(request: Id): Observable<NullableItem>;

  createFeedback(request: CreateInput1): Observable<Feedback>;

  updateFeedback(request: UpdateInput): Observable<Feedback>;

  deleteFeedback(request: Id): Observable<Count>;

  /** feedback */

  overviewStatistic(request: QueryRequest): Observable<OverviewStatistic>;
}

export interface MerchantServiceController {
  find(request: QueryRequest): Promise<MerchantPagination> | Observable<MerchantPagination> | MerchantPagination;

  findAll(request: QueryRequest): Promise<Merchants> | Observable<Merchants> | Merchants;

  findOne(request: QueryRequest): Promise<NullableMerchant> | Observable<NullableMerchant> | NullableMerchant;

  create(
    request: CreateInput,
  ): Promise<CreateMerchantResponse> | Observable<CreateMerchantResponse> | CreateMerchantResponse;

  count(request: QueryRequest): Promise<Count> | Observable<Count> | Count;

  findById(request: Id): Promise<NullableMerchant> | Observable<NullableMerchant> | NullableMerchant;

  /** branch */

  branch(request: QueryRequest): Promise<NullableBranch> | Observable<NullableBranch> | NullableBranch;

  findBranches(request: QueryRequest): Promise<BranchPagination> | Observable<BranchPagination> | BranchPagination;

  branches(request: QueryRequest): Promise<Branches> | Observable<Branches> | Branches;

  findBranchById(request: Id): Promise<NullableBranch> | Observable<NullableBranch> | NullableBranch;

  createBranch(request: CreateBranchInput): Promise<Branch> | Observable<Branch> | Branch;

  updateBranch(request: UpdateBranchInput): Promise<Branch> | Observable<Branch> | Branch;

  deleteBranch(request: Id): Promise<Count> | Observable<Count> | Count;

  /** group */

  group(request: QueryRequest): Promise<NullableGroup> | Observable<NullableGroup> | NullableGroup;

  groups(request: QueryRequest): Promise<GroupPagination> | Observable<GroupPagination> | GroupPagination;

  findGroupById(request: Id): Promise<NullableGroup> | Observable<NullableGroup> | NullableGroup;

  createGroup(request: CreateGroupInput): Promise<Group> | Observable<Group> | Group;

  updateGroup(request: UpdateGroupInput): Promise<Group> | Observable<Group> | Group;

  deleteGroup(request: Id): Promise<Count> | Observable<Count> | Count;

  /** service */

  service(request: QueryRequest): Promise<NullableService> | Observable<NullableService> | NullableService;

  services(request: QueryRequest): Promise<ServicePagination> | Observable<ServicePagination> | ServicePagination;

  findServiceById(request: Id): Promise<NullableService> | Observable<NullableService> | NullableService;

  createService(request: CreateServiceInput): Promise<Service> | Observable<Service> | Service;

  updateService(request: UpdateServiceInput): Promise<Service> | Observable<Service> | Service;

  deleteService(request: Id): Promise<Count> | Observable<Count> | Count;

  /** feedback */

  feedback(request: QueryRequest): Promise<NullableItem> | Observable<NullableItem> | NullableItem;

  feedbacks(request: QueryRequest): Promise<ItemPagination> | Observable<ItemPagination> | ItemPagination;

  findFeedbackById(request: Id): Promise<NullableItem> | Observable<NullableItem> | NullableItem;

  createFeedback(request: CreateInput1): Promise<Feedback> | Observable<Feedback> | Feedback;

  updateFeedback(request: UpdateInput): Promise<Feedback> | Observable<Feedback> | Feedback;

  deleteFeedback(request: Id): Promise<Count> | Observable<Count> | Count;

  /** feedback */

  overviewStatistic(
    request: QueryRequest,
  ): Promise<OverviewStatistic> | Observable<OverviewStatistic> | OverviewStatistic;
}

export function MerchantServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "find",
      "findAll",
      "findOne",
      "create",
      "count",
      "findById",
      "branch",
      "findBranches",
      "branches",
      "findBranchById",
      "createBranch",
      "updateBranch",
      "deleteBranch",
      "group",
      "groups",
      "findGroupById",
      "createGroup",
      "updateGroup",
      "deleteGroup",
      "service",
      "services",
      "findServiceById",
      "createService",
      "updateService",
      "deleteService",
      "feedback",
      "feedbacks",
      "findFeedbackById",
      "createFeedback",
      "updateFeedback",
      "deleteFeedback",
      "overviewStatistic",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MerchantService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MerchantService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MERCHANT_SERVICE_NAME = "MerchantService";
