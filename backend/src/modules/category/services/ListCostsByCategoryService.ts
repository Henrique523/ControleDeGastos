import AppError from '@shared/errors/AppError'
import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import Cost from '../infra/typeorm/entities/Cost'
import ICategoryRepository from '../repositories/ICategoryRepository'
import ICostRepository from '../repositories/ICostRepository'

interface IRequest {
  category_id: number
}

@injectable()
class ListCostsByCategoryService {
  constructor(
    @inject('CostsRepository')
    private costsRepository: ICostRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository
  ) {}

  public async execute({ category_id }: IRequest): Promise<Cost[]> {
    const categoryVerifier = await this.categoriesRepository.show(category_id)

    if (!categoryVerifier) {
      throw new AppError('Category doesn`t exists in database.')
    }

    const costsByCategory = await this.costsRepository.findCostsByCategory(category_id)

    return costsByCategory
  }
}

export default ListCostsByCategoryService
