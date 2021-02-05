import Category from '../infra/typeorm/entities/Category'
import IUpdateCategoryDTO from '../dtos/IUpdateCategoryDTO'

export default interface ICategoryRepository {
  createCategory(description: string): Promise<Category>
  updateCategory(data: IUpdateCategoryDTO): Promise<Category>
  deleteCategory(id: number): Promise<void>
  findAllCategories(): Promise<Category[]>
  findSpecificCategory(id: number): Promise<Category | undefined>
  save(category: Category): Promise<Category>
}
