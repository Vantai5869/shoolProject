import { EServiceShowType, EServiceType } from '@libs/grpc-types/protos/service';
import { BeforeCreate, BeforeUpdate, BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { toUFT8NonSpecialCharacters } from '@libs/core';
import { MerchantModel } from '@libs/database/entities/merchant/merchant.model';

import { BaseModel } from '../base.model';

@Table({
  modelName: 'service',
  tableName: 'services',
  underscored: true,
})
export class ServiceModel extends BaseModel<ServiceModel> {
  @Column({ type: DataType.INTEGER, allowNull: false })
  groupId?: number;

  @ForeignKey(() => MerchantModel)
  @Column({ type: DataType.INTEGER })
  merchantId?: number;

  @Column({ type: DataType.DOUBLE, defaultValue: 0 })
  price?: number;

  @Column({ type: DataType.DOUBLE, defaultValue: 0 })
  initialPrice?: number;

  @Column({ type: DataType.INTEGER })
  durationHour?: number;

  @Column({ type: DataType.INTEGER })
  durationMinute?: number;

  @Column({ type: DataType.TEXT })
  sku?: string;

  @Column({ type: DataType.TEXT })
  code?: string;

  @Column({ type: DataType.TEXT })
  name?: string;

  @Column({ type: DataType.TEXT })
  description?: string;

  @Column({ type: DataType.TEXT })
  image?: string;

  @Column({ type: DataType.INTEGER })
  type?: EServiceType;

  @Column({ type: DataType.INTEGER })
  showType?: EServiceShowType;

  @Column({ type: DataType.BOOLEAN })
  canPrintableInvoice?: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  search?: string;

  @BelongsTo(() => MerchantModel, 'merchantId')
  merchant?: MerchantModel;

  @BeforeCreate
  @BeforeUpdate
  static async updateSearch(model: ServiceModel) {
    const columnsToConcatenate = ['name', 'code', 'sku', 'price', 'initialPrice', 'description'];
    const concatenatedValues = columnsToConcatenate
      .map((columnName) => (model.get(columnName) ? model.get(columnName) : ' '))
      .join(' ');

    model.setDataValue('search', concatenatedValues.concat(' ', toUFT8NonSpecialCharacters(concatenatedValues)));
  }
}
