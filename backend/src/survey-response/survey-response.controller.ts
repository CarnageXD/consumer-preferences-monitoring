import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SurveyResponseService } from './survey-response.service';
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto';
import { UpdateSurveyResponseDto } from './dto/update-survey-response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('survey-responses')
@ApiTags('survey-responses')
export class SurveyResponseController {
  constructor(private readonly surveyResponseService: SurveyResponseService) {}

  @Post()
  create(@Body() createSurveyResponseDto: CreateSurveyResponseDto) {
    return this.surveyResponseService.create(createSurveyResponseDto);
  }

  @Get()
  findAll() {
    return this.surveyResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveyResponseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSurveyResponseDto: UpdateSurveyResponseDto,
  ) {
    return this.surveyResponseService.update(+id, updateSurveyResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveyResponseService.remove(+id);
  }
}
