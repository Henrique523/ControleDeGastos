import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateNewCategoryService from '@modules/category/services/CreateNewCategoryService'
import DeleteCategoryService from '@modules/category/services/DeleteCategoryService'
import ListCategoriesService from '@modules/category/services/ListCategoriesService'
import ListSpecificCategoryService from '@modules/category/services/ListSpecificCategoryService'
import UpdateCategoryService from '@modules/category/services/UpdateCategoryService'

export default class CategoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description } = request.body

    const createCategory = container.resolve(CreateNewCategoryService)

    const newCategory = await createCategory.execute({ description })

    return response.json(classToClass(newCategory))
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategoriesService)

    const categories = await listCategories.execute()

    return response.json(classToClass(categories))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const listCategories = container.resolve(ListSpecificCategoryService)

    const category = await listCategories.execute({ id })

    return response.json(classToClass(category))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { description } = request.body

    const updateCategory = container.resolve(UpdateCategoryService)

    const updatedCategory = await updateCategory.execute({ description, id })

    return response.json(classToClass(updatedCategory))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteCategory = container.resolve(DeleteCategoryService)

    await deleteCategory.execute({ id })

    return response.status(200).send()
  }
}
