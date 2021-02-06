import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository'
import ListCategoriesService from './ListCategoriesService'
import DeleteCategoryService from './DeleteCategoryService'

let fakeCategoryRepository: FakeCategoryRepository
let listCategoriesService: ListCategoriesService
let deleteCategoryService: DeleteCategoryService

describe('ListCategoriesService', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository()
    listCategoriesService = new ListCategoriesService(fakeCategoryRepository)
    deleteCategoryService = new DeleteCategoryService(fakeCategoryRepository)
  })

  it('should be able to list all categories from database', async () => {
    await fakeCategoryRepository.create('Category_1')
    await fakeCategoryRepository.create('Category_2')
    await fakeCategoryRepository.create('Category_3')

    const allCategories = await listCategoriesService.execute()

    expect(allCategories).toHaveLength(3)
    expect(allCategories[0].description).toEqual('Category_1')
    expect(allCategories[1].description).toEqual('Category_2')
    expect(allCategories[2].description).toEqual('Category_3')
  })

  it('should be able to list only available categories', async () => {
    await fakeCategoryRepository.create('Category_1')
    await fakeCategoryRepository.create('Category_2')
    await fakeCategoryRepository.create('Category_3')

    await deleteCategoryService.execute({ id: 1 })

    const availableCategories = await listCategoriesService.execute()

    expect(availableCategories).toHaveLength(2)
    expect(availableCategories[0].description).toEqual('Category_2')
    expect(availableCategories[1].description).toEqual('Category_3')
  })
})
