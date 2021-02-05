import AppError from '@shared/errors/AppError'
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository'
import CreateNewCategoryService from './CreateNewCategoryService'

let fakeCategoryRepository: FakeCategoryRepository
let createNewCategoryService: CreateNewCategoryService

describe('CreateNewCategoryService', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository()
    createNewCategoryService = new CreateNewCategoryService(fakeCategoryRepository)
  })

  it('should be able to create a new category', async () => {
    const category = await fakeCategoryRepository.createCategory('Categoria1')

    expect(category).toHaveProperty('id')
    expect(category.description).toBe('Categoria1')
  })

  it('should not be able to create a category with an existing description', async () => {
    await createNewCategoryService.execute({ description: 'Categoria1' })

    await expect(createNewCategoryService.execute({ description: 'Categoria1' })).rejects.toBeInstanceOf(AppError)
  })
})
