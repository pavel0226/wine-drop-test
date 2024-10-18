interface BasicWine {
    id: number;
    rank: number;
    name: string;
    master_wine_id: number;
    total_revenue: number;
    vintage: number;
}

export interface SortOption {
    value: string
    title: string
}

export interface MasterWind extends Partial<Pick<BasicWine, 'id' | 'name' | 'vintage'>> {} 
export interface ProductWine extends Partial<Pick<BasicWine, 'id' | 'vintage' | 'name' | 'total_revenue' | 'rank'>> {}
