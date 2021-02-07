import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Category from '../infra/typeorm/entities/Category'
import ICategoryRepository from '../repositories/ICategoryRepository'

interface IRequest {
  id: string
}

@injectable()
class ListSpecificCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesService: ICategoryRepository
  ) {}

  public async execute({ id }: IRequest): Promise<Category> {
    const category = await this.categoriesService.show(id)

    if (!category) {
      throw new AppError('Category not found.')
    }

    return category
  }
}

export default ListSpecificCategoryService
