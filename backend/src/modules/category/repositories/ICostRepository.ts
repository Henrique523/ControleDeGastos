import ICreateCostDTO from '../dtos/ICreateCostDTO'
import Cost from '../infra/typeorm/entities/Cost'

export default interface ICostRepository {
  createCost(data: ICreateCostDTO): Promise<Cost>
  updateCost(data: ICreateCostDTO): Promise<Cost>
  deleteCost(id: number): Promise<void>
  findAllCosts(): Promise<Cost[]>
  findCostsByCategory(category_id: number): Promise<Cost[]>
  findCostsByDate(date: Date): Promise<Cost[]>
  save(cost: Cost): Promise<Cost>
}
