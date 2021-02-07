import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import CostController from '../controllers/CostController'

const costController = new CostController()

const costRouter = Router()

costRouter.get('/', costController.index)
costRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  costController.show
)
costRouter.get(
  '/by-category/:category_id',
  celebrate({
    [Segments.PARAMS]: {
      category_id: Joi.string().required(),
    },
  }),
  costController.findByCategory
)
costRouter.get(
  '/by-month/month/:month/year/:year',
  celebrate({
    [Segments.PARAMS]: {
      month: Joi.required(),
      year: Joi.required(),
    },
  }),
  costController.findAllInMonth
)

costRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      value: Joi.number().required(),
      date: Joi.date().required(),
      category_id: Joi.string().required(),
    },
  }),
  costController.create
)
costRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      value: Joi.number().required(),
      date: Joi.date().required(),
      category_id: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.required(),
    },
  }),
  costController.update
)

costRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  costController.delete
)

export default costRouter
