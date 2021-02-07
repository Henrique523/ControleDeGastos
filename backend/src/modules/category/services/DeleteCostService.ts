import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICostRepository from '../repositories/ICostRepository'

interface IRequest {
  id: string
}

@injectable()
class DeleteCostService {
  constructor(
    @inject('CostsRepository')
    private costsRepository: ICostRepository
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const cost = await this.costsRepository.show(id)

    if (!cost) {
      throw new AppError('Cost doesn`t found in database.')
    }

    await this.costsRepository.delete(id)
  }
}

export default DeleteCostService
