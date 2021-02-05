import AppError from '@shared/errors/AppError'

import UpdateCategoryService from './UpdateCategoryService'
import CreateNewCategoryService from './CreateNewCategoryService'
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository'

let fakeCategoryRepository: FakeCategoryRepository
let updateCategoryService: UpdateCategoryService
let createNewCategoryService: CreateNewCategoryService

describe('UpdateCategoryService', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository()
    createNewCategoryService = new CreateNewCategoryService(fakeCategoryRepository)
    updateCategoryService = new UpdateCategoryService(fakeCategoryRepository)
  })

  it('should be able to update an existing category', async () => {
    const newCategory = await createNewCategoryService.execute({ description: 'Categoria 1' })
    const updatedCategory = await updateCategoryService.execute({ id: newCategory.id, description: 'Categoria 2' })

    expect(updatedCategory.description).toBe('Categoria 2')
  })

  it('should not be able to update an unexisting category', async () => {
    await createNewCategoryService.execute({ description: 'Categoria 1' })

    await expect(updateCategoryService.execute({ id: 2, description: 'Categoria 2' })).rejects.toBeInstanceOf(AppError)
  })
})
