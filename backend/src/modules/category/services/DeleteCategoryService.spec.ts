import AppError from '@shared/errors/AppError'

import DeleteCategoryService from './DeleteCategoryService'
import CreateNewCategoryService from './CreateNewCategoryService'

import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository'

let fakeCategoryRepository: FakeCategoryRepository
let createNewCategoryService: CreateNewCategoryService
let deleteCategoryService: DeleteCategoryService

describe('DeleteCategoryService', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository()
    createNewCategoryService = new CreateNewCategoryService(fakeCategoryRepository)
    deleteCategoryService = new DeleteCategoryService(fakeCategoryRepository)
  })

  it('should be able to delete an existing category', async () => {
    const deleteCategory = jest.spyOn(fakeCategoryRepository, 'delete')

    const category = await createNewCategoryService.execute({ description: 'Category_1' })
    await deleteCategoryService.execute({ id: category.id })

    expect(deleteCategory).toHaveBeenCalled()
  })

  it('should not be able to delete an non-existing category', async () => {
    await createNewCategoryService.execute({ description: 'Category_1' })

    await expect(deleteCategoryService.execute({ id: 'adfadsfas' })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to delete a category that has already been deleted', async () => {
    const category = await createNewCategoryService.execute({ description: 'Category_1' })
    await deleteCategoryService.execute({ id: category.id })

    await expect(deleteCategoryService.execute({ id: category.id })).rejects.toBeInstanceOf(AppError)
  })
})
