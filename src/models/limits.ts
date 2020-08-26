export interface ILimits {
    limit: number,
    value: string
}

export class Get {
    inputType: string = '';
    value: string | number  = '';
}

export class Set {
    error: string = '';
    value: string = '';
}

export class Limits {
    limit: Array<ILimits> = [{limit: 20, value: 'val'}]
}

