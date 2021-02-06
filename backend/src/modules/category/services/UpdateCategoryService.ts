import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Category from '../infra/typeorm/entities/Category'
import ICategoryRepository from '../repositories/ICategoryRepository'

interface IRequest {
  id: number
  description: string
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository
  ) {}

  public async execute({ id, description }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.show(id)

    if (!category) {
      throw new AppError('This category does not exists on database.')
    }

    category.description = description

    const updatedCategory = await this.categoriesRepository.save(category)
    return updatedCategory
  }
}

export default UpdateCategoryService
