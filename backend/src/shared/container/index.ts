import { container } from 'tsyringe'

import ICategoryRepository from '@modules/category/repositories/ICategoryRepository'
import CategoriesRepository from '@modules/category/infra/typeorm/repositories/CategoriesRepository'

container.registerSingleton<ICategoryRepository>('CategoriesRepository', CategoriesRepository)
