export type Product = {
    amount: number;
    category_id: number;
    created_at: string;
    description: string;
    id: number;
    img_url: string;
    name: string;
    price: number;
    user_id: string;
};

export type Category = {
    created_at: Date;
    id: number;
    name: string;
    user_id: string;
};
