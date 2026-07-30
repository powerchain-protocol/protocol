
export type ApiMeta = {
  requestId: string;
  timestamp: string;
  version: "v1";
};

export type ApiSuccess<T> = {
  data: T;
  meta: ApiMeta;
};

export type ApiFailure = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta: ApiMeta;
};

export type Paginated<T> = {
  items: T[];
  nextCursor: string | null;
  total?: number;
};
