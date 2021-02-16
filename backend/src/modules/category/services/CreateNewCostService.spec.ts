import AppError from '@shared/errors/AppError'

import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository'
import FakeCostRepository from '../repositories/fakes/FakeCostRepository'

import CreateNewCostService from './CreateNewCostService'

let fakeCostRepository: FakeCostRepository
let fakeCategoryRepository: FakeCategoryRepository
let createNewCostService: CreateNewCostService

describe('CreateNewCostService', () => {
  beforeEach(() => {
    fakeCostRepository = new FakeCostRepository()
    fakeCategoryRepository = new FakeCategoryRepository()
    createNewCostService = new CreateNewCostService(fakeCostRepository, fakeCategoryRepository)
  })

  it('should be able to create a new cost', async () => {
    const category = await fakeCategoryRepository.create('Category_1')
    const newCost = await createNewCostService.execute({
      category_id: category.id,
      date: new Date(2021, 1, 25),
      description: 'Gasto_1',
      value: 250,
    })

    expect(newCost).toHaveProperty('id')
    expect(newCost.description).toBe('Gasto_1')
  })

  it('should not be able to create a new cost with a non-existing category', async () => {
    await expect(
      createNewCostService.execute({
        category_id: 'afadfdasf',
        date: new Date(2021, 1, 25),
        description: 'Gasto_1',
        value: 250,
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
