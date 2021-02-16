import AppError from '@shared/errors/AppError'

import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository'
import FakeCostRepository from '../repositories/fakes/FakeCostRepository'
import ListSpecificCostService from './ListSpecificCostService'

let fakeCostRepository: FakeCostRepository
let fakeCategoryRepository: FakeCategoryRepository
let listSpecificCostService: ListSpecificCostService

describe('ListSpecificCostService', () => {
  beforeEach(() => {
    fakeCostRepository = new FakeCostRepository()
    fakeCategoryRepository = new FakeCategoryRepository()
    listSpecificCostService = new ListSpecificCostService(fakeCostRepository)
  })

  it('should be able to list a specific cost by id', async () => {
    const category = await fakeCategoryRepository.create('Category_1')
    const cost = await fakeCostRepository.create({
      category_id: category.id,
      date: new Date(),
      description: 'Gasto 1',
      value: 250,
    })

    const findCost = await listSpecificCostService.execute({ id: cost.id })

    expect(findCost.description).toBe('Gasto 1')
  })

  it('should not be able to list a cost with invalid id', async () => {
    const category = await fakeCategoryRepository.create('Category_1')
    await fakeCostRepository.create({
      category_id: category.id,
      date: new Date(),
      description: 'Gasto 1',
      value: 250,
    })

    await expect(listSpecificCostService.execute({ id: 'non-existing-id' })).rejects.toBeInstanceOf(AppError)
  })
})
