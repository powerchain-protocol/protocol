
export type AnalyticsEvent={id:string;name:string;properties:Record<string,unknown>;occurredAt:string};
export type MetricPoint={label:string;value:number;unit?:string};
export type ChartSeries={id:string;label:string;points:{x:string;y:number}[]};
