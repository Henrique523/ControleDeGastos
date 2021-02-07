import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Cost from '../infra/typeorm/entities/Cost'
import ICategoryRepository from '../repositories/ICategoryRepository'
import ICostRepository from '../repositories/ICostRepository'

interface IRequest {
  date: Date
  description: string
  value: number
  category_id: number
}

@injectable()
class CreateNewCostService {
  constructor(
    @inject('CostsRepository')
    private costsRepository: ICostRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository
  ) {}

  public async execute({ category_id, date, value, description }: IRequest): Promise<Cost> {
    const categoryVerifier = await this.categoriesRepository.show(category_id)

    if (!categoryVerifier) {
      throw new AppError('Category selected doesn`t exists in database.')
    }

    const newCost = await this.costsRepository.create({ category_id, description, value, date })

    return newCost
  }
}

export default CreateNewCostService
