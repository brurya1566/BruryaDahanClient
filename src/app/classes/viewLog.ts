export class viewLog {
    constructor(
        public id: number,
        public componentName: string,
        public responsibleId: string,
        public responsibleName: string,
        public logMalfunctionStatusName: string,
        public statusDescription: string,
        public malfunctionId:number
    )
    {}
}
