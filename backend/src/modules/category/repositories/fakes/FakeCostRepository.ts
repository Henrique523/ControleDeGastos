import Category from '@modules/category/infra/typeorm/entities/Category'
import ICreateCostDTO from '@modules/category/dtos/ICreateCostDTO'
import Cost from '@modules/category/infra/typeorm/entities/Cost'
import ICostRepository from '../ICostRepository'

export default class FakeCostRepository implements ICostRepository {
  private costs: Cost[] = []

  public async createCost({ description, category_id, date, value }: ICreateCostDTO): Promise<Cost> {
    const category = new Category()

    const created_at = new Date()
    const updated_at = new Date()
    const deleted_at = null
    const id = this.costs.length + 1

    this.costs.push({ id, description, category_id, category, date, value, created_at, updated_at, deleted_at })

    return this.costs[id - 1]
  }

  public async findAllCosts(): Promise<Cost[]> {
    return this.costs
  }

  public async findCostById(id: number): Promise<Cost | undefined> {
    const cost = this.costs.find(cost => cost.id === id)

    return cost
  }

  public async findCostsByCategory(category_id: number): Promise<Cost[]> {
    return this.costs.filter(cost => cost.category_id === category_id)
  }

  public async findCostsByDate(date: Date): Promise<Cost[]> {
    return this.costs.filter(cost => cost.date === date)
  }

  public async deleteCost(id: number): Promise<void> {
    const indexCost = this.costs.findIndex(cost => cost.id === id)

    this.costs[indexCost].deleted_at = new Date()
  }

  public async save(cost: Cost): Promise<Cost> {
    return cost
  }
}