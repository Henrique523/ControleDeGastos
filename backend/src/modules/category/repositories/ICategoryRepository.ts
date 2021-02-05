import Category from '../infra/typeorm/entities/Category'

export default interface ICategoryRepository {
  createCategory(description: string): Promise<Category>
  findAllCategories(): Promise<Category[]>
  findCategoryById(id: number): Promise<Category | undefined>
  findCategoryByDescription(description: string): Promise<Category | undefined>
  deleteCategory(id: number): Promise<void>
  save(category: Category): Promise<Category>
}
