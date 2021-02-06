import ICreateCostDTO from '../dtos/ICreateCostDTO'
import Cost from '../infra/typeorm/entities/Cost'

export default interface ICostRepository {
  create(data: ICreateCostDTO): Promise<Cost>
  index(): Promise<Cost[]>
  show(id: number): Promise<Cost | undefined>
  findCostsByCategory(category_id: number): Promise<Cost[]>
  findCostsByDate(date: Date): Promise<Cost[]>
  delete(id: number): Promise<void>
  save(cost: Cost): Promise<Cost>
}
