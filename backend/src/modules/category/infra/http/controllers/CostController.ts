import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateNewCostService from '@modules/category/services/CreateNewCostService'
import ListAllCostsService from '@modules/category/services/ListAllCostsService'
import ListSpecificCostService from '@modules/category/services/ListSpecificCostService'
import ListCostsByCategoryService from '@modules/category/services/ListCostsByCategoryService'
import ListMonthCostsService from '@modules/category/services/ListMonthCostsService'
import UpdateCostService from '@modules/category/services/UpdateCostService'
import DeleteCostService from '@modules/category/services/DeleteCostService'

export default class CostController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { category_id, description, value, date } = request.body

    const createCost = container.resolve(CreateNewCostService)

    const newCost = await createCost.execute({ description, value, date, category_id })

    return response.json(classToClass(newCost))
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCosts = container.resolve(ListAllCostsService)

    const costs = await listCosts.execute()

    return response.json(classToClass(costs))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const listSpecificCost = container.resolve(ListSpecificCostService)

    const cost = await listSpecificCost.execute({ id })

    return response.json(classToClass(cost))
  }

  public async findByCategory(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params

    const findCostByCategory = container.resolve(ListCostsByCategoryService)

    const costs = await findCostByCategory.execute({ category_id })

    return response.json(classToClass(costs))
  }

  public async findAllInMonth(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.params

    const findAllInMonth = container.resolve(ListMonthCostsService)

    const costs = await findAllInMonth.execute({ month: Number(month), year: Number(year) })

    return response.json(classToClass(costs))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { description, value, date, category_id } = request.body

    const updateCost = container.resolve(UpdateCostService)

    const updatedCost = await updateCost.execute({ id, description, category_id, date, value })

    return response.json(classToClass(updatedCost))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteCost = container.resolve(DeleteCostService)

    await deleteCost.execute({ id })

    return response.status(200).send()
  }
}
