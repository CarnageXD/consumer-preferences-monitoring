import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyEntity } from './entities/survey.entity';
import { CreateSurveyDto, CreateQuestionDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyQuestionEntity } from '@survey-question/entities/survey-question.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyEntity)
    private readonly surveyRepository: Repository<SurveyEntity>,
    @InjectRepository(SurveyQuestionEntity)
    private readonly questionRepository: Repository<SurveyQuestionEntity>,
  ) {}

  async create(createSurveyDto: CreateSurveyDto): Promise<SurveyEntity> {
    const { title, questions } = createSurveyDto;

    const savedSurvey = await this.surveyRepository.save({ title });

    for (const questionDto of questions) {
      const question = this.createQuestion(questionDto);
      question.survey = savedSurvey;
      await this.questionRepository.save(question);
    }

    return savedSurvey;
  }

  async findAll(): Promise<SurveyEntity[]> {
    return await this.surveyRepository.find();
  }

  async findOne(id: number): Promise<SurveyEntity> {
    return await this.surveyRepository.findOne({
      where: { id },
      relations: ['questions', 'responses'],
    });
  }

  async update(
    id: number,
    updateSurveyDto: UpdateSurveyDto,
  ): Promise<SurveyEntity> {
    const { title, questions } = updateSurveyDto;

    const survey = await this.surveyRepository.findOne({ where: { id } });
    if (!survey) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }

    survey.title = title;
    const updatedSurvey = await this.surveyRepository.save(survey);

    // Remove existing questions for the survey
    await this.questionRepository.delete({ survey: { id: updatedSurvey.id } });

    // Create and associate new questions with the survey
    for (const questionDto of questions) {
      const question = this.createQuestion(questionDto);
      question.survey = updatedSurvey;
      await this.questionRepository.save(question);
    }

    return updatedSurvey;
  }

  async remove(id: number) {
    const survey = await this.surveyRepository.findOne({
      where: { id },
      relations: ['questions'],
    });

    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }

    await this.questionRepository.remove(survey.questions);
    const removedSurvey = await this.surveyRepository.remove(survey);

    return { ...removedSurvey, id };
  }

  private createQuestion(questionDto: CreateQuestionDto) {
    const { question, type, options } = questionDto;
    const questionEntity = new SurveyQuestionEntity();
    questionEntity.question = question;
    questionEntity.type = type;
    questionEntity.options = options;
    return questionEntity;
  }
}
