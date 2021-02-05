import { Repository, getRepository } from 'typeorm'

import IUpdateCategoryDTO from '@modules/category/dtos/IUpdateCategoryDTO'
import ICategoryRepository from '@modules/category/repositories/ICategoryRepository'

import DatabaseError from '@shared/errors/DatabaseError'

import Category from '../entities/Category'

export default class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>

  constructor() {
    this.ormRepository = getRepository(Category)
  }

  public async createCategory(description: string): Promise<Category> {
    const category = this.ormRepository.create({ description })

    return category
  }

  public async findAllCategories(): Promise<Category[]> {
    const categories = await this.ormRepository.find()

    return categories
  }

  public async findSpecificCategory(id: number): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne(id)

    return category
  }

  public async updateCategory({ description, id }: IUpdateCategoryDTO): Promise<Category> {
    const category = await this.ormRepository.findOne(id)

    if (!category) {
      throw new DatabaseError('Category does not exists in database.')
    }

    category.description = description
    await this.save(category)

    return category
  }

  public async deleteCategory(id: number): Promise<void> {
    const category = await this.ormRepository.findOne(id)

    if (!category) {
      throw new DatabaseError('Category does not exists in database.')
    }

    await this.ormRepository.softDelete(category)
  }

  public async save(category: Category): Promise<Category> {
    const updatedCategory = await this.ormRepository.save(category)

    return updatedCategory
  }
}
