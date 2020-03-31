export class Components {
    id: number
    name: string
    latitude: number
    longitude: number
    showName:string
    constructor(_id: number,
        _name: string,
        _latitude: number,
        _longitude: number,_showName:string) {
        this.id = _id
        this.name = _name
        this.latitude = _latitude
        this.longitude = _longitude
        this.showName=_showName
    }

}