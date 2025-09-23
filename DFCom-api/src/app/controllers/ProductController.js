import * as Yup from 'yup';
import Product from '../models/Product';
import Review from '../models/Review';

class ProductController {

    async store(req, res) {

        console.log(req.body);
        
        const schema = Yup.object().shape({
            name: Yup.string()
                .required(),
            description: Yup.string()
                .required(),
            price: Yup.number()
                .required(),
            category: Yup.string()
                .required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Dados inválidos!"
            });
        };

        const data = req.body;

        const product = await Product.create(data, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: product não foi cadastrado com sucesso!"
            });
        });

        return res.status(200).json({
            error: false,
            message: "product cadastrado com sucesso!",
            data: product
        })
    };

    async index(req, res) {
        const { page = 1 } = req.query;
        const { limit = 40 } = req.query;
        await Product.paginate({}, {
            select: '_id createdAt updatedAt name description price category',
            page,
            limit,
        }).then((product) => {
            return res.json({
                error: false,
                product: product
            });
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async show(req, res) {
        await Product.findOne({ _id: req.params.id })
            //.populate('site itens departamentos endereco')
            .then((product) => {

                return res.json({
                    error: false,
                    produto: product
                });
            }).catch((err) => {
                return res.status(400).json({
                    error: true,
                    code: 108,
                    message: "Erro: Não foi possível executar a solicitação!"
                })
            });
    };


    async update(req, res) {

        const data = req.body;
        const ProductExists = await Product.findOne({ _id: req.params.id });

        if (!ProductExists) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Produto não encontrado!"
            });
        };

        await Product.updateOne({ _id: req.params.id }, data, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Erro: Produto não foi editado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Produto editado com sucesso!"
            });
        });

    };

    async delete(req, res) {

        console.log(req.params.id);

        const ProductExists = await Product.findOne({ _id: req.params.id });

        if (!ProductExists) {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Produto não encontrado!"
            });
        };

        await Product.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Product não foi excluido com sucesso!"
            });
        });

        await Review.deleteMany({ productId: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Reviews não foram excluidos com sucesso!"
            });
        });

        return res.json({
            error: false,
            message: "Product e reviews excluidos com sucesso!"
        });

    };

};

export default new ProductController();