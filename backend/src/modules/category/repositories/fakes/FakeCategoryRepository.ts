import { uuid } from 'uuidv4'
import Category from '@modules/category/infra/typeorm/entities/Category'

import ICategoryRepository from '../ICategoryRepository'

export default class FakeCategoryRepository implements ICategoryRepository {
  private categories: Category[] = []

  public async create(description: string): Promise<Category> {
    const id = uuid()
    const created_at = new Date()
    const updated_at = new Date()
    const deleted_at = null

    const category = this.categories.push({ id, description, created_at, updated_at, deleted_at })

    return this.categories[category - 1]
  }

  public async index(): Promise<Category[]> {
    return this.categories.filter(category => category.deleted_at === null)
  }

  public async show(id: string): Promise<Category> {
    const indexCategory = this.categories.findIndex(category => category.id === id && category.deleted_at === null)
    return this.categories[indexCategory]
  }

  public async findCategoryByDescription(description: string): Promise<Category | undefined> {
    return this.categories.find(category => category.description === description && category.deleted_at === null)
  }

  public async delete(id: string): Promise<void> {
    const indexCategory = this.categories.findIndex(category => category.id === id && category.deleted_at === null)

    if (indexCategory !== null) {
      this.categories[indexCategory].deleted_at = new Date()
    }
  }

  public async save(category: Category): Promise<Category> {
    const indexCategory = this.categories.findIndex(categoryBD => categoryBD.id === category.id)

    this.categories.splice(indexCategory, 1, Object.assign({}, category))

    return category
  }
}
