import { EServiceShowType, EServiceType } from '@libs/grpc-types/protos/merchant_common';
import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateServiceInput {
  @IsNotEmpty()
  @IsInt()
  groupId?: number;

  sku?: string;

  code?: string;

  @IsNotEmpty()
  @IsString()
  name?: string;

  description?: string;

  image?: string;

  @IsNotEmpty()
  price?: number;

  initialPrice?: number;

  durationHour?: number;

  durationMinute?: number;

  type?: EServiceType;

  showType?: EServiceShowType;

  canPrintableInvoice?: boolean;

  @IsOptional()
  @IsInt()
  merchantId?: number;
}

export class PartialUpdateService extends PartialType(CreateServiceInput) {}
