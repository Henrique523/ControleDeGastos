import AppError from '@shared/errors/AppError'
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository'
import FakeCostRepository from '../repositories/fakes/FakeCostRepository'
import FindCostsByRangeDate from './FindCostsByRangeDate'

let fakeCategoryRepository: FakeCategoryRepository
let fakeCostsRepository: FakeCostRepository
let findCostsByRangeDate: FindCostsByRangeDate

describe('FindCostsByRangeDate', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository()
    fakeCostsRepository = new FakeCostRepository()
    findCostsByRangeDate = new FindCostsByRangeDate(fakeCostsRepository)
  })

  it('should be able to find all costs that`s in a range date', async () => {
    const category = await fakeCategoryRepository.create('Category_1')
    await fakeCostsRepository.create({
      category_id: category.id,
      date: new Date(2021, 0, 15),
      description: 'Gasto 1',
      value: 250,
    })

    await fakeCostsRepository.create({
      category_id: category.id,
      date: new Date(2021, 0, 16),
      description: 'Gasto 2',
      value: 300,
    })

    await fakeCostsRepository.create({
      category_id: category.id,
      date: new Date(2021, 0, 17),
      description: 'Gasto 3',
      value: 350,
    })

    const initialDate = new Date(2021, 0, 15)
    const finalDate = new Date()
    const costs = await findCostsByRangeDate.execute({ initialDate, finalDate })

    expect(costs).toHaveLength(3)

    const initialDate2 = new Date(2021, 0, 16)
    const newCosts = await findCostsByRangeDate.execute({ initialDate: initialDate2, finalDate })

    expect(newCosts).toHaveLength(2)
  })
  it('should not be able to find any costs with an invalid date', async () => {
    const category = await fakeCategoryRepository.create('Category_1')
    await fakeCostsRepository.create({
      category_id: category.id,
      date: new Date(2021, 0, 15),
      description: 'Gasto 1',
      value: 250,
    })

    await fakeCostsRepository.create({
      category_id: category.id,
      date: new Date(2021, 0, 16),
      description: 'Gasto 2',
      value: 300,
    })

    await fakeCostsRepository.create({
      category_id: category.id,
      date: new Date(2021, 0, 17),
      description: 'Gasto 3',
      value: 350,
    })

    const initialDate = new Date()
    const finalDate = new Date(2021, 0, 15)
    await expect(findCostsByRangeDate.execute({ initialDate, finalDate })).rejects.toBeInstanceOf(AppError)
  })
})
