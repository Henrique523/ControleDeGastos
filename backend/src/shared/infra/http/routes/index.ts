import { Router } from 'express'

import categoryRouter from '@modules/category/infra/http/routes/categories.routes'
import costRouter from '@modules/category/infra/http/routes/costs.routes'

const routes = Router()

routes.use('/categories', categoryRouter)
routes.use('/costs', costRouter)

export default routes
