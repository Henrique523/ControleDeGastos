import ICreateCostDTO from '../dtos/ICreateCostDTO'
import IFindMonthCostsDTO from '../dtos/IFindMonthCostsDTO'
import Cost from '../infra/typeorm/entities/Cost'

export default interface ICostRepository {
  create(data: ICreateCostDTO): Promise<Cost>
  index(): Promise<Cost[]>
  show(id: string): Promise<Cost | undefined>
  findCostsByCategory(category_id: string): Promise<Cost[]>
  findMonthCosts(data: IFindMonthCostsDTO): Promise<Cost[]>
  delete(id: string): Promise<void>
  save(cost: Cost): Promise<Cost>
}
