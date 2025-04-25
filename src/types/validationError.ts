export interface ValidationError {
    errors: {
        [field: string]: string[];
    };
    status: number;
    traceId: string;
}
  