import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import Cost from '../infra/typeorm/entities/Cost'
import ICostRepository from '../repositories/ICostRepository'

@injectable()
class ListAllCostsService {
  constructor(
    @inject('CostsRepository')
    private costsRepository: ICostRepository
  ) {}

  public async execute(): Promise<Cost[]> {
    const costs = await this.costsRepository.index()

    return costs
  }
}

export default ListAllCostsService
