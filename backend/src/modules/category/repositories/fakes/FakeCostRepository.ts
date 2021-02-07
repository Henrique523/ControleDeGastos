import { getMonth, getYear } from 'date-fns'
import { uuid } from 'uuidv4'

import Category from '@modules/category/infra/typeorm/entities/Category'
import ICreateCostDTO from '@modules/category/dtos/ICreateCostDTO'
import Cost from '@modules/category/infra/typeorm/entities/Cost'
import IFindMonthCostsDTO from '@modules/category/dtos/IFindMonthCostsDTO'

import ICostRepository from '../ICostRepository'

export default class FakeCostRepository implements ICostRepository {
  private costs: Cost[] = []

  public async create({ description, category_id, date, value }: ICreateCostDTO): Promise<Cost> {
    const category = new Category()

    const created_at = new Date()
    const updated_at = new Date()
    const deleted_at = null
    const id = uuid()

    const cost = this.costs.push({
      id,
      description,
      category_id,
      category,
      date,
      value,
      created_at,
      updated_at,
      deleted_at,
    })

    return this.costs[cost - 1]
  }

  public async index(): Promise<Cost[]> {
    return this.costs.filter(cost => cost.deleted_at === null)
  }

  public async show(id: string): Promise<Cost | undefined> {
    const cost = this.costs.find(cost => cost.id === id && cost.deleted_at === null)

    return cost
  }

  public async findCostsByCategory(category_id: string): Promise<Cost[]> {
    return this.costs.filter(cost => cost.category_id === category_id && cost.deleted_at === null)
  }

  public async findMonthCosts({ month, year }: IFindMonthCostsDTO): Promise<Cost[]> {
    const costs = this.costs.filter(
      cost => getMonth(cost.date) + 1 === month && getYear(cost.date) === year && cost.deleted_at === null
    )

    return costs
  }

  public async delete(id: string): Promise<void> {
    const indexCost = this.costs.findIndex(cost => cost.id === id)

    this.costs[indexCost].deleted_at = new Date()
  }

  public async save(cost: Cost): Promise<Cost> {
    const updated_at = new Date()
    cost.updated_at = updated_at

    const indexCost = this.costs.findIndex(costDB => costDB.id === cost.id)

    this.costs.splice(indexCost, 1, cost)

    return cost
  }
}
