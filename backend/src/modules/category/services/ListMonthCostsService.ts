import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { getDate, getDaysInMonth } from 'date-fns'

import Cost from '../infra/typeorm/entities/Cost'
import ICostRepository from '../repositories/ICostRepository'

interface IRequest {
  year: number
  month: number
}

type IResponse = Array<{
  day: number
  costs: Array<Cost>
}>

@injectable()
class ListMonthCostsService {
  constructor(
    @inject('CostsRepository')
    private costsRepository: ICostRepository
  ) {}

  public async execute({ month, year }: IRequest): Promise<IResponse> {
    const costs = await this.costsRepository.findMonthCosts({ year, month })

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))
    const eachDayArray = Array.from({ length: numberOfDaysInMonth }, (_, index) => index + 1)

    const monthCosts = eachDayArray.map(day => {
      const costsInDay = costs.filter(cost => getDate(cost.date) === day)

      return { day, costs: costsInDay }
    })

    const filteredMonthCosts = monthCosts.filter(monthCost => monthCost.costs.length > 0)

    return filteredMonthCosts
  }
}

export default ListMonthCostsService
