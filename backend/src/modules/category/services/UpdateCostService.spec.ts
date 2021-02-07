import AppError from '@shared/errors/AppError'
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository'
import FakeCostRepository from '../repositories/fakes/FakeCostRepository'

import UpdateCostService from './UpdateCostService'

let fakeCostRepository: FakeCostRepository
let fakeCategoryRepository: FakeCategoryRepository
let updateCostService: UpdateCostService

describe('UpdateCostService', () => {
  beforeEach(() => {
    fakeCostRepository = new FakeCostRepository()
    fakeCategoryRepository = new FakeCategoryRepository()
    updateCostService = new UpdateCostService(fakeCostRepository, fakeCategoryRepository)
  })

  it('should be able to update an existing cost', async () => {
    const save = jest.spyOn(fakeCostRepository, 'save')

    const category = await fakeCategoryRepository.create('Category_1')
    const cost = await fakeCostRepository.create({
      category_id: category.id,
      date: new Date(2021, 1, 15),
      value: 250,
      description: 'Gasto_1',
    })

    const updatedCost = await updateCostService.execute({
      category_id: category.id,
      date: new Date(2021, 1, 15),
      value: 350,
      description: 'Gasto_1_Editado',
      id: cost.id,
    })

    expect(save).toHaveBeenCalledWith(updatedCost)
    expect(updatedCost.description).toBe('Gasto_1_Editado')
    expect(updatedCost.value).toBe(350)
  })

  it('should not be able to update a non-existing cost', async () => {
    await expect(
      updateCostService.execute({
        category_id: 'dfadsf',
        date: new Date(2021, 1, 15),
        value: 350,
        description: 'Gasto_1_Editado',
        id: 'dfadfesf',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it(`should not be able to update a cost with a non-existing category`, async () => {
    const category = await fakeCategoryRepository.create('Category_1')
    await fakeCostRepository.create({
      category_id: category.id,
      date: new Date(2021, 1, 15),
      value: 250,
      description: 'Gasto_1',
    })

    await expect(
      updateCostService.execute({
        category_id: 'adfasdf',
        date: new Date(2021, 1, 15),
        value: 350,
        description: 'Gasto_1_Editado',
        id: 'adsfas',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
