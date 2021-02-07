import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository'
import FakeCostRepository from '../repositories/fakes/FakeCostRepository'
import ListMonthCostsService from './ListMonthCostsService'

let fakeCategoryRepository: FakeCategoryRepository
let fakeCostRepository: FakeCostRepository
let listMonthCostsService: ListMonthCostsService

describe('ListMonthCostsService', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository()
    fakeCostRepository = new FakeCostRepository()
    listMonthCostsService = new ListMonthCostsService(fakeCostRepository)
  })

  it('should be able to list all costs on a specific month', async () => {
    const category = await fakeCategoryRepository.create('Category_1')

    await fakeCostRepository.create({
      category_id: category.id,
      date: new Date(2021, 0, 1),
      description: 'Gasto 1',
      value: 140,
    })

    await fakeCostRepository.create({
      category_id: category.id,
      date: new Date(2021, 0, 2),
      description: 'Gasto 2',
      value: 140,
    })

    await fakeCostRepository.create({
      category_id: category.id,
      date: new Date(2021, 1, 1),
      description: 'Gasto 3',
      value: 140,
    })

    const monthCosts = await listMonthCostsService.execute({ month: 1, year: 2021 })

    expect(monthCosts).toHaveLength(2)
    expect(monthCosts[0].day).toBe(1)
    expect(monthCosts[1].day).toBe(2)
  })
})
