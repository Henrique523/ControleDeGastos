import { container } from 'tsyringe'

import ICategoryRepository from '@modules/category/repositories/ICategoryRepository'
import CategoriesRepository from '@modules/category/infra/typeorm/repositories/CategoriesRepository'

import ICostRepository from '@modules/category/repositories/ICostRepository'
import CostsRepository from '@modules/category/infra/typeorm/repositories/CostsRepository'

container.registerSingleton<ICategoryRepository>('CategoriesRepository', CategoriesRepository)
container.registerSingleton<ICostRepository>('CostsRepository', CostsRepository)
