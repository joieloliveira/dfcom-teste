import * as Yup from 'yup';
import mongoose from 'mongoose';
import Product from '../models/Product';
import Review from '../models/Review';

class ReviewController {

    async store(req, res) {
        console.log(req.body);
        const schema = Yup.object().shape({
            author: Yup.string()
                .required(),
            rating: Yup.number()
                .required()
                .min(1)
                .max(5),
            comment: Yup.string()
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

        const review = await Review.create(data, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Review não foi cadastrado com sucesso!"
            });
        });

        return res.status(200).json({
            error: false,
            message: "Review cadastrado com sucesso!",
            data: review
        })

    };

    async index(req, res) {
        const { page = 1 } = req.query;
        const { limit = 40 } = req.query;
        await Review.paginate({}, {
            select: '_id createdAt updatedAt productId author rating comment',
            page,
            limit,
        }).then((review) => {
            return res.json({
                error: false,
                review: review
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
        await Review.find({ productId: req.params.id })
            //.populate('name iten')
            .then((review) => {

                return res.json({
                    error: false,
                    review: review
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
        const reviewExists = await Review.findOne({ _id: req.params.id });

        if (!reviewExists) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Review não encontrado!"
            });
        };

        await Review.updateOne({ _id: req.params.id }, data, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Erro: Review não foi editado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Review editado com sucesso!"
            });
        });

    };

    async delete(req, res) {

        const reviewExists = await Review.findOne({ _id: req.params.id });

        if (!reviewExists) {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Review não encontrado!"
            });
        };

        await Review.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Review não foi excluido com sucesso!"
            });
        });

        return res.json({
            error: false,
            message: "Review e review excluidos com sucesso!"
        });

    };

    async rating(req, res) {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de produto inválido' });
        }

        try {
            const result = await Review.aggregate([
                {
                    $match: { productId: new mongoose.Types.ObjectId(id) } // filtra pelo produto
                },
                {
                    $group: {
                        _id: '$productId',
                        averageRating: { $avg: '$rating' },   // calcula média
                        totalReviews: { $sum: 1 }             // conta reviews
                    }
                }
            ]);

            if (result.length === 0) {
                return res.status(404).json({ message: 'Nenhuma avaliação encontrada para este produto.' });
            }

            res.json(result[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao calcular a média de avaliações.' });
        }

    };

};

export default new ReviewController();