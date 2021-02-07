import AppError from '@shared/errors/AppError'

import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository'
import ListSpecificCategoryService from './ListSpecificCategoryService'

let fakeCategoryRepository: FakeCategoryRepository
let listSpecificCategoryService: ListSpecificCategoryService

describe('ListSpecificCategoryService', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository()
    listSpecificCategoryService = new ListSpecificCategoryService(fakeCategoryRepository)
  })

  it('should be able to list a category by id', async () => {
    const category = await fakeCategoryRepository.create('Category_1')

    const findCategory = await listSpecificCategoryService.execute({ id: category.id })

    expect(findCategory.description).toBe('Category_1')
  })

  it('should not be able to list a category with invalid id', async () => {
    await fakeCategoryRepository.create('Category_1')

    await expect(listSpecificCategoryService.execute({ id: 'dfasdf' })).rejects.toBeInstanceOf(AppError)
  })
})
