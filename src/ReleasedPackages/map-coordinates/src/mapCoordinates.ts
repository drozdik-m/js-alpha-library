

export class MapCoordinates
{
    lat: number;
    lng: number;

    constructor(lat: number, lgn: number)
    {
        this.lat = lat;
        this.lng = lgn;
    }

    GetLat(): number
    {
        return this.lat;
    }

    GetLng(): number
    {
        return this.lng;
    }

    toString(): string
    {
        return `${this.lat}, ${this.lng}`;
    }
}

