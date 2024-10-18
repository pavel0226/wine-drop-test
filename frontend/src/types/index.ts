interface BasicWine {
    id: number;
    name: string;
    master_wine_id: number;
    total_revenue: number;
    vintage: number;
}

export interface MasterWind extends Partial<Pick<BasicWine, 'id' | 'name' | 'vintage'>> {} 
export interface ProductWine extends Partial<Pick<BasicWine, 'id' | 'vintage' | 'name' | 'total_revenue'>> {}