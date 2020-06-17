import { Request, Response } from 'express';
import knex from '../database/connection';

import { IPointsPost, IPoints, IPointItems, IItems } from "../interfaces";

class PointsController {

    async index (request: Request, response: Response) {
        // Filtro por cidade, UF, itens - Sempre que for lidar com filtros, pegar do query params
        const { city, uf, items } = request.query;

        // console.log(city, uf, items);

        const parsedItems: number[] = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points: IPoints[] = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.0.104:3333/uploads/${point.image}` // alterado de localhost para ip para conseguir usar no app
            }
        }); 

        return response.json(serializedPoints);
    }

    async show (request: Request, response: Response) {
        const id: number = Number(request.params.id);

        const point: IPoints = await knex('points').where('id', id).first();

        const items: IItems[] = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        if (!point) {
            return response.status(400).json({ message: 'Point not found!'});
        }

        const serializedPoint = {
            ...point,
            image_url: `http://192.168.0.104:3333/uploads/${point.image}` // alterado de localhost para ip para conseguir usar no app
        }; 

        return response.json({ point: serializedPoint, items });
    }

    // foi alterado a forma de envio do request para form data (ao invés de json) para conseguir enviar imagem
    async create (request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        }: IPointsPost = request.body;
    
        const trx = await knex.transaction();
    
        const point: IPoints = {
            // image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', 
            image: request.file.filename, 
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };

        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items
            .split(',')
            .map(item => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id: Number(item_id),
                    point_id: point_id 
                };
        })
    
        await trx('point_items').insert(pointItems);
    
        await trx.commit();
    
        return response.json({
            id: point_id,
            ... point
        });
    }


    // Ficou desatualizado depois do upload de imagem
    // async createMeuJeito (request: Request, response: Response) {
    //     let pointPost: IPointsPost = request.body;
    //     pointPost.image = 'image-fake';
    //     let point: IPoints = {
    //         name: pointPost.name,
    //         email: pointPost.email,
    //         whatsapp: pointPost.whatsapp,
    //         latitude: pointPost.latitude,
    //         longitude: pointPost.longitude,
    //         city: pointPost.city,
    //         uf: pointPost.uf,
    //         image: pointPost.image,
    //     };
    
    //     const trx = await knex.transaction();
    
    //     const insertedIds: number[] = await trx('points').insert(point);
    
    //     const pointItems: IPointItems[] = pointPost.items.map((item_id: number) => {
    //         return {
    //             item_id: item_id,
    //             point_id: insertedIds[0]
    //         };
    //     })
    
    //     await trx('point_items').insert(pointItems);
    
    //     await trx.commit();
    
    //     return response.json({
    //         id: insertedIds[0],
    //         ... point
    //     });
    // }

};

export default PointsController;