import { Repository, getRepository, Raw, LessThanOrEqual, MoreThanOrEqual } from 'typeorm'

import ICostRepository from '@modules/category/repositories/ICostRepository'
import ICreateCostDTO from '@modules/category/dtos/ICreateCostDTO'

import Cost from '../entities/Cost'
import IFindMonthCostsDTO from '@modules/category/dtos/IFindMonthCostsDTO'
import IFindCostsByDateDTO from '@modules/category/dtos/IFindCostsByDateDTO'

export default class CostsRepository implements ICostRepository {
  private ormRepository: Repository<Cost>

  constructor() {
    this.ormRepository = getRepository(Cost)
  }

  public async create({ category_id, date, description, value }: ICreateCostDTO): Promise<Cost> {
    const cost = this.ormRepository.create({ category_id, date, description, value })

    await this.save(cost)

    return cost
  }

  public async index(): Promise<Cost[]> {
    const costs = await this.ormRepository.find()

    return costs
  }

  public async show(id: string): Promise<Cost | undefined> {
    const cost = this.ormRepository.findOne(id)

    return cost
  }

  public async findCostsByCategory(category_id: string): Promise<Cost[]> {
    const costs = await this.ormRepository.find({ where: { category_id } })

    return costs
  }

  public async findMonthCosts({ year, month }: IFindMonthCostsDTO): Promise<Cost[]> {
    const parsedMonth = String(month).padStart(2, '0')

    const costs = await this.ormRepository.find({
      where: {
        date: Raw(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`),
      },
    })

    return costs
  }

  public async findCostsByDate({ initialDate, finalDate }: IFindCostsByDateDTO): Promise<Cost[]> {
    const costs = await this.ormRepository.find({
      where: {
        date: MoreThanOrEqual(initialDate) && LessThanOrEqual(finalDate),
      },
    })

    return costs
  }

  public async delete(id: string): Promise<void> {
    const cost = await this.ormRepository.findOne(id)

    if (cost) {
      this.ormRepository.softDelete(cost.id)
    }
  }

  public async save(cost: Cost): Promise<Cost> {
    const updatedCost = await this.ormRepository.save(cost)
    return updatedCost
  }
}
