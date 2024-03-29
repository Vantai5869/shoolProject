import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { GroupService } from './group.service';

import { JwtAuthGuard } from '@/api-gateway/core';
import { CreateGroupInput, PartialUpdateGroup } from '@/api-gateway/dtos';
import { MerchantCommonService } from '@/api-gateway/modules/merchant-common/merchant-common.service';

@Controller('groups')
export class GroupController {
  constructor(private readonly merchantService: MerchantCommonService, private readonly groupService: GroupService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createGroup(@Body() data: CreateGroupInput) {
    const result = await this.groupService.create(data);
    return result;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateGroup(@Param('id') id: number, @Body() data: PartialUpdateGroup) {
    const result = await this.groupService.update(id, data);
    return result;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteGroup(@Param('id') id: number) {
    const result = await this.groupService.delete(id);
    return result;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findDetail(@Body('id') id: number) {
    const result = await this.groupService.findDetail(id);
    return result;
  }
}
