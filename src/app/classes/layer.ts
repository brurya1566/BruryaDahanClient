
export class Layer {
    id: number
    name: string
    nameConvention: string
    url:string
    zoom:number
    concretLayer:__esri.FeatureLayer
    constructor(_id: number,
        _name: string,
        _nameConvention: string,_url:string) {
        this.id = _id
        this.name = _name
        this.nameConvention = _nameConvention
        this.url=_url
    }
}