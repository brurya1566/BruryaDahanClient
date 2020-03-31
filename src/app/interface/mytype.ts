import esri = __esri; // Esri TypeScript Types
export interface myType {
    hirarchiaList: string[]
    _first: string
    contain: string
    _zoom: number;
    _center: Array<number>
    _basemap: string
    _view: esri.MapView
    _layer: esri.FeatureLayer
    _ctyLayer: esri.FeatureLayer
    _stnLayer: esri.FeatureLayer
    _flrLayer: esri.FeatureLayer
    _camLayer: esri.FeatureLayer
    _wndLayer: esri.FeatureLayer
    _field: esri.Field
    _map: esri.Map
    _feature: any
    getFeatures(response)
    newMalfunction()
    removed()
    added(first)
    initializeMap(mapViewEl)

}
