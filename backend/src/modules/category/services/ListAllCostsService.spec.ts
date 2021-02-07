import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository'
import FakeCostRepository from '../repositories/fakes/FakeCostRepository'

import ListAllCostsService from './ListAllCostsService'

let fakeCategoryRepository: FakeCategoryRepository
let fakeCostRepository: FakeCostRepository
let listCostsService: ListAllCostsService

describe('ListAllCostsService', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository()
    fakeCostRepository = new FakeCostRepository()
    listCostsService = new ListAllCostsService(fakeCostRepository)
  })

  it('should be able to list all available services', async () => {
    const category = await fakeCategoryRepository.create('Category_1')

    await fakeCostRepository.create({
      category_id: category.id,
      date: new Date(2021, 1, 15),
      description: 'Gasto 1',
      value: 250,
    })

    await fakeCostRepository.create({
      category_id: category.id,
      date: new Date(2021, 1, 15),
      description: 'Gasto 2',
      value: 300,
    })

    await fakeCostRepository.create({
      category_id: category.id,
      date: new Date(2021, 1, 15),
      description: 'Gasto 3',
      value: 350,
    })

    const allCosts = await listCostsService.execute()

    expect(allCosts).toHaveLength(3)
    expect(allCosts[0].description).toBe('Gasto 1')
    expect(allCosts[1].description).toBe('Gasto 2')
    expect(allCosts[2].description).toBe('Gasto 3')
  })
})
