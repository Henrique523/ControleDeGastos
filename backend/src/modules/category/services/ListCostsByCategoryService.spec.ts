import AppError from '@shared/errors/AppError'

import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository'
import FakeCostRepository from '../repositories/fakes/FakeCostRepository'

import ListCostsByCategoryService from './ListCostsByCategoryService'

let fakeCategoryRepository: FakeCategoryRepository
let fakeCostRepository: FakeCostRepository
let listCostsByCategoryService: ListCostsByCategoryService

describe('ListCostsByCategoryService', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository()
    fakeCostRepository = new FakeCostRepository()
    listCostsByCategoryService = new ListCostsByCategoryService(fakeCostRepository, fakeCategoryRepository)
  })

  it('should be able to list all costs filtered by category', async () => {
    const category1 = await fakeCategoryRepository.create('Category_1')
    const category2 = await fakeCategoryRepository.create('Category_2')

    await fakeCostRepository.create({
      category_id: category1.id,
      date: new Date(2021, 1, 15),
      description: 'Gasto 1',
      value: 100,
    })

    await fakeCostRepository.create({
      category_id: category2.id,
      date: new Date(2021, 1, 15),
      description: 'Gasto 2',
      value: 100,
    })

    await fakeCostRepository.create({
      category_id: category1.id,
      date: new Date(2021, 1, 15),
      description: 'Gasto 3',
      value: 100,
    })

    const costsFilteredByCategory = await listCostsByCategoryService.execute({ category_id: category1.id })

    expect(costsFilteredByCategory).toHaveLength(2)
    expect(costsFilteredByCategory[0].description).toBe('Gasto 1')
    expect(costsFilteredByCategory[1].description).toBe('Gasto 3')
  })

  it('should not be able to list costs by a non-existing category', async () => {
    const category1 = await fakeCategoryRepository.create('Category_1')

    await fakeCostRepository.create({
      category_id: category1.id,
      date: new Date(2021, 1, 15),
      description: 'Gasto 1',
      value: 100,
    })

    await fakeCostRepository.create({
      category_id: category1.id,
      date: new Date(2021, 1, 15),
      description: 'Gasto 3',
      value: 100,
    })

    await expect(listCostsByCategoryService.execute({ category_id: 'adfadf' })).rejects.toBeInstanceOf(AppError)
  })
})
