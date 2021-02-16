import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Category from '../infra/typeorm/entities/Category'
import ICategoryRepository from '../repositories/ICategoryRepository'

interface IRequest {
  description: string
}

@injectable()
class CreateNewCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository
  ) {}

  public async execute({ description }: IRequest): Promise<Category> {
    const checkCategoryExists = await this.categoriesRepository.findCategoryByDescription(description)

    if (checkCategoryExists) {
      throw new AppError('A category with this description already exists.')
    }

    const newCategory = await this.categoriesRepository.create(description)

    return newCategory
  }
}

export default CreateNewCategoryService
