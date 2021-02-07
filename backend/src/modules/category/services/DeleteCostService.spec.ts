import AppError from '@shared/errors/AppError'
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository'
import FakeCostRepository from '../repositories/fakes/FakeCostRepository'
import DeleteCostService from './DeleteCostService'

let fakeCostRepository: FakeCostRepository
let fakeCategoryRepository: FakeCategoryRepository
let deleteCostService: DeleteCostService

describe('DeleteCostService', () => {
  beforeEach(() => {
    fakeCostRepository = new FakeCostRepository()
    fakeCategoryRepository = new FakeCategoryRepository()
    deleteCostService = new DeleteCostService(fakeCostRepository)
  })

  it('should be able to delete an existing cost', async () => {
    const deleteCategory = jest.spyOn(fakeCostRepository, 'delete')

    const category = await fakeCategoryRepository.create('Category_1')

    const newCost = await fakeCostRepository.create({
      category_id: category.id,
      date: new Date(2021, 1, 25),
      description: 'Gasto_1',
      value: 250,
    })

    await deleteCostService.execute({ id: newCost.id })

    expect(deleteCategory).toHaveBeenCalledWith(newCost.id)
  })

  it('should not be able to delete a non-existing cost', async () => {
    await expect(deleteCostService.execute({ id: 'dhfakfge' })).rejects.toBeInstanceOf(AppError)
  })
})
