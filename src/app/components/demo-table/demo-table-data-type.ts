export interface DemoTableDataType {
    name: string;
    address: string;
    extra?: string;
    custom?: {
        foo: string;
    };
}
