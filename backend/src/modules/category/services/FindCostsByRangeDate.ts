import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICostRepository from '../repositories/ICostRepository'
import IFindCostsByDateDTO from '../dtos/IFindCostsByDateDTO'
import Cost from '../infra/typeorm/entities/Cost'

@injectable()
class FindCostsByRangeDate {
  constructor(
    @inject('CostsRepository')
    private costsRepository: ICostRepository
  ) {}

  public async execute({ initialDate, finalDate }: IFindCostsByDateDTO): Promise<Cost[]> {
    if (initialDate > finalDate) {
      throw new AppError('Date can`t be more or equals than today.')
    }

    const costs = await this.costsRepository.findCostsByDate({ initialDate, finalDate })

    return costs
  }
}

export default FindCostsByRangeDate
