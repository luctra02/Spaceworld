export interface Game {
    id: number;
    name: string;
    cover: {
        image_id: string;
    };
    url: string;
    total_rating: number;
    total_rating_count: number;
}
