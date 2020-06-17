export interface IPointsPost {
    id?: number;
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    latitude: string;
    longitude: string;
    city: string;
    uf: string;
    // items: number[];
    items: string; //usando form data para enviar image, aí essa info não vem mais como array
}

export interface IPoints {
    id?: number;
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    latitude: string;
    longitude: string;
    city: string;
    uf: string;
}

export interface IItems {
    id?: number;
    image: string;
    title: string;
}

export interface IPointItems {
    id?: number;
    point_id: number;
    item_id: number;
}
