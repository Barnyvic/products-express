import { Request, Response, NextFunction } from 'express'
import ProductShema from '../model/Productmodel'

const createProduct = async (req: Request, res: Response) => {
    try {
        const {
            title,
            imagePath,
            description,
            price,
            manufacturer,
            available,
            createdAt,
        } = req.body

        if (
            !(
                title ||
                imagePath ||
                description ||
                price ||
                manufacturer ||
                available ||
                createdAt
            )
        )
            return res.status(409).send({ message: 'Input Fields required' })
        const Productdata = await ProductShema.create({
            ProductCode: Math.trunc(Math.random() * 10000),
            Title: title,
            ImagePath: imagePath,
            Description: description,
            Price: price,
            Manufacturer: manufacturer,
            Available: available,
            CreatedAt: createdAt,
        })
        res.status(200).send({ data: Productdata })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

const allProducts = async (req: Request, res: Response) => {
    const pageOptions = {
        page: parseInt(req.query.page as any, 10) || 0,
        limit: parseInt(req.query.limit as any, 10) || 10,
    }

    let filter = {}
    if (req.query.title) {
        filter = { Title: req.query.title }
    }
    try {
        const Products = await ProductShema.find(filter)
            .limit(pageOptions.limit)
            .skip(pageOptions.page * pageOptions.limit)
        res.status(200).send({
            date: Products,
            totalPage: Math.ceil(pageOptions.page / pageOptions.limit),
            currentPage: Number(pageOptions.page),
        })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).send({ error: error.message })
    }
}

const UpdateProduct = async (req: Request, res: Response) => {
    const { Title, Description, Price, Available } = req.body
    try {
        const produuct = await ProductShema.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    Title: Title,
                    Description: Description,
                    Price: Price,
                    Available: Available,
                },
            },
            {
                new: true,
            }
        )
        res.status(200).send({
            message: 'Product successfully updated',
            data: produuct,
        })
    } catch (error: any) {
        console.log(error.message)
        res.status(404).send({ error: error.message })
    }
}

async function deleteProduct(req: Request, res: Response) {
    const productID = req.params.id
    try {
        await ProductShema.findByIdAndDelete({ _id: productID })
        res.status(200).send({ message: 'Product deleted successfully' })
    } catch (error: any) {
        console.log(error.message)
        res.status(404).send({ error: error.message })
    }
}
export { createProduct, allProducts, UpdateProduct, deleteProduct }
