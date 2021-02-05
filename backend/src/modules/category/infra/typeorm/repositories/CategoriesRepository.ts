import { Repository, getRepository } from 'typeorm'

import ICategoryRepository from '@modules/category/repositories/ICategoryRepository'

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

  public async findCategoryById(id: number): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne(id)

    return category
  }

  public async findCategoryByDescription(description: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ where: { description } })
    return category
  }

  public async deleteCategory(id: number): Promise<void> {
    const category = await this.ormRepository.findOne(id)

    if (category) {
      await this.ormRepository.softDelete(category)
    }
  }

  public async save(category: Category): Promise<Category> {
    const updatedCategory = await this.ormRepository.save(category)

    return updatedCategory
  }
}
