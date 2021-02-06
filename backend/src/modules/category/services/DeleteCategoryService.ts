import AppError from '@shared/errors/AppError'
import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import ICategoryRepository from '../repositories/ICategoryRepository'

interface IRequest {
  id: number
}

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const category = await this.categoryRepository.show(id)

    if (!category) {
      throw new AppError('Category doesn`t find in database.')
    }
    await this.categoryRepository.delete(id)
  }
}

export default DeleteCategoryService
