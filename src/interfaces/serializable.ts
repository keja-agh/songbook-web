interface SerializableObj {
    toJSON(): string;
}

export interface Serializable {
    new(...args: any[]): SerializableObj;
    fromJSON(json: string): SerializableObj;
}

export function staticImplements<T>() {
    return <U extends T>(constructor: U) => { constructor };
}