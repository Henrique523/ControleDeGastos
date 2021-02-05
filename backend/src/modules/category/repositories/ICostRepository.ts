import ICreateCostDTO from '../dtos/ICreateCostDTO'
import Cost from '../infra/typeorm/entities/Cost'

export default interface ICostRepository {
  createCost(data: ICreateCostDTO): Promise<Cost>
  findAllCosts(): Promise<Cost[]>
  findCostById(id: number): Promise<Cost | undefined>
  findCostsByCategory(category_id: number): Promise<Cost[]>
  findCostsByDate(date: Date): Promise<Cost[]>
  deleteCost(id: number): Promise<void>
  save(cost: Cost): Promise<Cost>
}
