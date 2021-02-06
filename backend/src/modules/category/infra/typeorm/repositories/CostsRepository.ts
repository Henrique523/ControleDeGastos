import { Repository, getRepository } from 'typeorm'

import ICostRepository from '@modules/category/repositories/ICostRepository'
import ICreateCostDTO from '@modules/category/dtos/ICreateCostDTO'

import Cost from '../entities/Cost'

export default class CostsRepository implements ICostRepository {
  private ormRepository: Repository<Cost>

  constructor() {
    this.ormRepository = getRepository(Cost)
  }

  public async create({ category_id, date, description, value }: ICreateCostDTO): Promise<Cost> {
    const cost = this.ormRepository.create({ category_id, date, description, value })
    return cost
  }

  public async index(): Promise<Cost[]> {
    const costs = await this.ormRepository.find()

    return costs
  }

  public async show(id: number): Promise<Cost | undefined> {
    const cost = this.ormRepository.findOne(id)

    return cost
  }

  public async findCostsByCategory(category_id: number): Promise<Cost[]> {
    const costs = await this.ormRepository.find({ where: { category_id } })

    return costs
  }

  public async findCostsByDate(date: Date): Promise<Cost[]> {
    const costs = await this.ormRepository.find({ where: { date } })

    return costs
  }

  public async delete(id: number): Promise<void> {
    const cost = await this.ormRepository.findOne(id)

    if (cost) {
      this.ormRepository.softDelete(cost)
    }
  }

  public async save(cost: Cost): Promise<Cost> {
    const updatedCost = await this.ormRepository.save(cost)
    return updatedCost
  }
}
