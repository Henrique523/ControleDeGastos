import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Cost from '../infra/typeorm/entities/Cost'
import ICostRepository from '../repositories/ICostRepository'

interface IRequest {
  id: string
}

@injectable()
class ListSpecificCostService {
  constructor(
    @inject('CostsRepository')
    private costsService: ICostRepository
  ) {}

  public async execute({ id }: IRequest): Promise<Cost> {
    const cost = await this.costsService.show(id)

    if (!cost) {
      throw new AppError('Cost not found.')
    }

    return cost
  }
}

export default ListSpecificCostService
