import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyEntity } from './entities/survey.entity';
import { CreateSurveyDto, CreateQuestionDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyQuestionEntity } from '@survey-question/entities/survey-question.entity';
import { SurveyResponseEntity } from '@survey-response/entities/survey-response.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyEntity)
    private readonly surveyRepository: Repository<SurveyEntity>,
    @InjectRepository(SurveyQuestionEntity)
    private readonly questionRepository: Repository<SurveyQuestionEntity>,
    @InjectRepository(SurveyResponseEntity)
    private readonly responseRepository: Repository<SurveyResponseEntity>,
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
    return await this.surveyRepository.find({
      relations: ['questions', 'responses'],
    });
  }

  async findAllExtended() {
    const surveys = await this.surveyRepository.find({
      relations: ['questions', 'responses', 'responses.question'],
    });

    for (const survey of surveys) {
      for (const question of survey.questions) {
        const questionResponses = survey.responses.filter(
          (response) => response.question.id === question.id,
        );

        if (question.type === 'text') {
          // Create an entry for text answers and store all responses in an array
          question['textAnswers'] = questionResponses.map(
            (response) => response.answers[0],
          );
        } else {
          const totalResponses = questionResponses.length;
          const answerCounts = {};

          for (const response of questionResponses) {
            for (const answer of response.answers) {
              if (!answerCounts[answer]) {
                answerCounts[answer] = 0;
              }
              answerCounts[answer]++;
            }
          }

          question['answerPercentages'] = {};
          for (const [answer, count] of Object.entries(answerCounts)) {
            if (!isNaN(+count) && totalResponses > 0) {
              question['answerPercentages'][answer] =
                (Number(count) / totalResponses) * 100;
            } else {
              question['answerPercentages'][answer] = 0;
            }
          }
        }
      }
    }

    return surveys;
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

    // Remove associated responses
    await this.responseRepository.delete({ survey: { id: survey.id } });

    // Remove associated questions
    await this.questionRepository.delete({ survey: { id: survey.id } });

    // Update and save the survey
    survey.title = title;
    const updatedSurvey = await this.surveyRepository.save(survey);

    // Associate new questions with the survey
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
