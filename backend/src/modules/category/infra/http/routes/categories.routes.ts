import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import CategoryController from '../controllers/CategoryController'

const categoryRouter = Router()
const categoryController = new CategoryController()

categoryRouter.get('/', categoryController.index)

categoryRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  categoryController.show
)

categoryRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
    },
  }),
  categoryController.create
)
categoryRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  categoryController.update
)
categoryRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  categoryController.delete
)

export default categoryRouter
