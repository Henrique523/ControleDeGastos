import { Repository, getRepository } from 'typeorm'

import ICategoryRepository from '@modules/category/repositories/ICategoryRepository'

import Category from '../entities/Category'

export default class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>

  constructor() {
    this.ormRepository = getRepository(Category)
  }

  public async create(description: string): Promise<Category> {
    const category = this.ormRepository.create({ description })

    await this.save(category)

    return category
  }

  public async index(): Promise<Category[]> {
    const categories = await this.ormRepository.find()

    return categories
  }

  public async show(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne(id)

    return category
  }

  public async findCategoryByDescription(description: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ where: { description } })
    return category
  }

  public async delete(id: string): Promise<void> {
    const category = await this.ormRepository.findOne(id)

    if (!category) {
      return
    }

    await this.ormRepository.softDelete(id)
  }

  public async save(category: Category): Promise<Category> {
    const updatedCategory = await this.ormRepository.save(category)

    return updatedCategory
  }
}
