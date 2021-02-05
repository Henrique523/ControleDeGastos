import Category from '@modules/category/infra/typeorm/entities/Category'

import ICategoryRepository from '../ICategoryRepository'

export default class FakeCategoryRepository implements ICategoryRepository {
  private categories: Category[] = []

  public async createCategory(description: string): Promise<Category> {
    const id = this.categories.length + 1
    const created_at = new Date()
    const updated_at = new Date()
    const deleted_at = null

    this.categories.push({ id, description, created_at, updated_at, deleted_at })

    return this.categories[id - 1]
  }

  public async findAllCategories(): Promise<Category[]> {
    return this.categories
  }

  public async findCategoryById(id: number): Promise<Category> {
    const indexCategory = this.categories.findIndex(category => category.id === id)
    return this.categories[indexCategory]
  }

  public async findCategoryByDescription(description: string): Promise<Category | undefined> {
    return this.categories.find(category => category.description === description)
  }

  public async deleteCategory(id: number): Promise<void> {
    const indexCategory = this.categories.findIndex(category => category.id === id)
    this.categories[indexCategory].deleted_at = new Date()
  }

  public async save(category: Category): Promise<Category> {
    const indexCategory = this.categories.findIndex(categoryBD => categoryBD.id === category.id)

    this.categories.splice(indexCategory, 1, Object.assign({}, category))

    return category
  }
}
