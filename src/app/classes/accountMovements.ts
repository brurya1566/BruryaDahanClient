
export class accountMovements {
    pkReferenceCode: number
    accountNumber: number
    datePeilut: Date
    sum: number
    subjectCode: number
    codeZchutChova: number
    branchCode: number
    descSubject: string
    descBranch: string
}
export interface accountMovementsI {
    pkReferenceCode: number
    accountNumber: number
    sum: number
    datePeilut: Date
    subjectCode: number
    codeZchutChova: number
    branchCode: number

    // descSubject:string
    // descBranch:string
}

