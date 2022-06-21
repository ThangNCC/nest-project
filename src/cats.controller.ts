/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes
} from '@nestjs/common';
import * as Joi from 'joi';
import { CatsService } from './cats.service';
import { CreateCatDto, UpdateCatDto } from './dto';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingInterceptor } from './logging.interceptor';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { JoiValidationPipe } from './validation.pipe';

const createCatschema = Joi.object().keys({
  name: Joi.string().required(),
  age: Joi.number(),
  breed: Joi.string(),
});
const catsService = new CatsService();
@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  @Post()
  @Roles('admin')
  @UsePipes(new JoiValidationPipe(createCatschema))
  async create(@Body() createCatDto: CreateCatDto) {
    catsService.create(createCatDto);
  }

  @Get()
  findAll(): string {
    return "All cats"
  }

  // @Get()
  // findAll(@Query() query: ListAllEntities) {
  //   return `This action returns all cats (limit: ${query.limit} items)`;
  // }

  @Get(':name')
  async findOne(
    @Param(
      'name',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    name: string,
  ) {
    console.log(name, '=============');

    return catsService.findOne(name);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
