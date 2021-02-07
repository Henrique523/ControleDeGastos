import Category from '../infra/typeorm/entities/Category'

export default interface ICategoryRepository {
  create(description: string): Promise<Category>
  index(): Promise<Category[]>
  show(id: string): Promise<Category | undefined>
  findCategoryByDescription(description: string): Promise<Category | undefined>
  delete(id: string): Promise<void>
  save(category: Category): Promise<Category>
}
