import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import Category from '../infra/typeorm/entities/Category'
import ICategoryRepository from '../repositories/ICategoryRepository'

@injectable()
class ListCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository
  ) {}

  public async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.index()

    return categories
  }
}

export default ListCategoriesService
