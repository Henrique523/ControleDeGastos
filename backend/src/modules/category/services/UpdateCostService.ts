import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Cost from '../infra/typeorm/entities/Cost'
import ICategoryRepository from '../repositories/ICategoryRepository'
import ICostRepository from '../repositories/ICostRepository'

interface IRequest {
  id: string
  description: string
  value: number
  date: Date
  category_id: string
}

@injectable()
class UpdateCostService {
  constructor(
    @inject('CostsRepository')
    private costsRepository: ICostRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository
  ) {}

  public async execute({ value, date, category_id, description, id }: IRequest): Promise<Cost> {
    const cost = await this.costsRepository.show(id)

    if (!cost) {
      throw new AppError('Cost selected doesn`t exists in database.')
    }

    const category = await this.categoriesRepository.show(category_id)

    if (!category) {
      throw new AppError('Category selected doesn`t exists.')
    }

    cost.description = description
    cost.value = value
    cost.date = date
    cost.category_id = category_id

    const updatedCost = await this.costsRepository.save(cost)

    return updatedCost
  }
}

export default UpdateCostService
