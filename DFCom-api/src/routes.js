import { Router } from 'express';

import ProductController from './app/controllers/ProductController';
import ReviewController from './app/controllers/ReviewController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/product', ProductController.store);
routes.get('/product', ProductController.index);
routes.get('/product/:id', ProductController.show);
routes.put('/product/:id', ProductController.update);
routes.delete('/product/:id', ProductController.delete);

routes.post('/review', ReviewController.store);
routes.get('/review', ReviewController.index);
routes.get('/review/:id', ReviewController.show);
routes.put('/review/:id', ReviewController.update);
routes.delete('/review/:id', ReviewController.delete);
routes.get('/review-rating/:id', ReviewController.rating);

//Exemplo de uso com autenticação
//routes.put('Product', authMiddleware, ProductController.update);

export default routes;