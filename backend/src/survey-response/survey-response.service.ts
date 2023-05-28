import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyResponseEntity } from './entities/survey-response.entity';
import { SurveyEntity } from '@survey/entities/survey.entity';
import { UserEntity } from '@users/entities/user.entity';
import { SurveyQuestionEntity } from '@survey-question/entities/survey-question.entity';
import { CreateSurveyResponseDto } from './dto/create-survey-response.dto';
import { UpdateSurveyResponseDto } from './dto/update-survey-response.dto';

@Injectable()
export class SurveyResponseService {
  constructor(
    @InjectRepository(SurveyResponseEntity)
    private readonly surveyResponseRepository: Repository<SurveyResponseEntity>,
    @InjectRepository(SurveyEntity)
    private readonly surveyRepository: Repository<SurveyEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SurveyQuestionEntity)
    private readonly questionRepository: Repository<SurveyQuestionEntity>,
  ) {}

  async create(
    createSurveyResponseDto: CreateSurveyResponseDto,
  ): Promise<{ response: SurveyResponseEntity[] }> {
    const { surveyId, userId, responses } = createSurveyResponseDto;

    const survey = await this.surveyRepository.findOne({
      where: { id: surveyId },
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!survey || !user) {
      throw new NotFoundException(`Survey or User not found`);
    }

    const surveyResponses: SurveyResponseEntity[] = [];

    for (const responseItem of responses) {
      const question = await this.questionRepository.findOne({
        where: { id: responseItem.questionId },
      });
      if (!question) {
        throw new NotFoundException(
          `Question response with id ${responseItem.questionId} not found`,
        );
      }

      const newSurveyResponse = this.surveyResponseRepository.create({
        survey,
        user,
        question,
        answers: responseItem.answers,
      });

      surveyResponses.push(
        await this.surveyResponseRepository.save(newSurveyResponse),
      );
    }

    return { response: surveyResponses };
  }

  async findAll(): Promise<SurveyResponseEntity[]> {
    return await this.surveyResponseRepository.find({
      relations: ['survey', 'user', 'question'],
    });
  }

  async findOne(id: number): Promise<SurveyResponseEntity> {
    const surveyResponse = await this.surveyResponseRepository.findOne({
      where: { id },
      relations: ['survey', 'user', 'question'],
    });
    if (!surveyResponse) {
      throw new NotFoundException(`Survey response with id ${id} not found`);
    }
    return surveyResponse;
  }

  async update(
    id: number,
    updateSurveyResponseDto: UpdateSurveyResponseDto,
  ): Promise<SurveyResponseEntity> {
    const surveyResponse = await this.surveyResponseRepository.findOne({
      where: { id },
      relations: ['survey', 'user', 'question'],
    });
    if (!surveyResponse) {
      throw new NotFoundException(`Survey response with id ${id} not found`);
    }

    surveyResponse.answers = updateSurveyResponseDto.answers;
    return await this.surveyResponseRepository.save(surveyResponse);
  }

  async remove(id: number): Promise<void> {
    const surveyResponse = await this.surveyResponseRepository.findOne({
      where: { id },
    });
    if (!surveyResponse) {
      throw new NotFoundException(`Survey response with id ${id} not found`);
    }
    await this.surveyResponseRepository.delete(id);
  }
}
