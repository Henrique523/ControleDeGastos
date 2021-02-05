import { Repository, getRepository } from 'typeorm'

import ICostRepository from '@modules/category/repositories/ICostRepository'
import ICreateCostDTO from '@modules/category/dtos/ICreateCostDTO'
import DatabaseError from '@shared/errors/DatabaseError'

import Cost from '../entities/Cost'

export default class CostsRepository implements ICostRepository {
  private ormRepository: Repository<Cost>

  constructor() {
    this.ormRepository = getRepository(Cost)
  }

  public async createCost({ category_id, date, description, value }: ICreateCostDTO): Promise<Cost> {
    const cost = this.ormRepository.create({ category_id, date, description, value })
    return cost
  }

  public async findAllCosts(): Promise<Cost[]> {
    const costs = await this.ormRepository.find()

    return costs
  }

  public async findCostsByCategory(category_id: number): Promise<Cost[]> {
    const costs = await this.ormRepository.find({ where: { category_id } })

    return costs
  }

  public async findCostsByDate(date: Date): Promise<Cost[]> {
    const costs = await this.ormRepository.find({ where: { date } })

    return costs
  }

  public async updateCost({ category_id, value, description, date, id }: ICreateCostDTO): Promise<Cost> {
    const cost = await this.ormRepository.findOne(id)

    if (!cost) {
      throw new DatabaseError('Data not found in database.')
    }

    cost.category_id = category_id
    cost.value = value
    cost.description = description
    cost.date = date

    await this.save(cost)

    return cost
  }

  public async deleteCost(id: number): Promise<void> {
    const cost = await this.ormRepository.findOne(id)

    if (!cost) {
      throw new DatabaseError('Data not found in database.')
    }

    this.ormRepository.softDelete(cost)
  }

  public async save(cost: Cost): Promise<Cost> {
    await this.ormRepository.save(cost)
    return cost
  }
}
