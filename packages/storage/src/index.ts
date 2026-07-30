
export type StoredObject = {
  key: string;
  url: string;
  size: number;
  contentType: string;
  etag?: string;
};

export interface ObjectStorage {
  upload(path: string, bytes: Uint8Array, contentType: string): Promise<StoredObject>;
  remove(path: string): Promise<void>;
  exists(path: string): Promise<boolean>;
  signedUrl(path: string, expiresInSeconds?: number): Promise<string>;
}

export class MemoryStorage implements ObjectStorage {
  private readonly files = new Map<string, { bytes: Uint8Array; contentType: string }>();

  async upload(path: string, bytes: Uint8Array, contentType: string): Promise<StoredObject> {
    this.files.set(path, { bytes, contentType });
    return {
      key: path,
      url: `memory://${path}`,
      size: bytes.byteLength,
      contentType
    };
  }

  async remove(path: string) {
    this.files.delete(path);
  }

  async exists(path: string) {
    return this.files.has(path);
  }

  async signedUrl(path: string) {
    if (!this.files.has(path)) throw new Error(`Object not found: ${path}`);
    return `memory://${path}`;
  }
}

export class SupabaseStorage implements ObjectStorage {
  constructor(
    private readonly client: {
      storage: {
        from(bucket: string): {
          upload(path: string, data: Uint8Array, options: { contentType: string; upsert: boolean }): Promise<{ data: { path: string } | null; error: Error | null }>;
          remove(paths: string[]): Promise<{ error: Error | null }>;
          createSignedUrl(path: string, expiresIn: number): Promise<{ data: { signedUrl: string } | null; error: Error | null }>;
          list(path: string, options: { search: string }): Promise<{ data: unknown[] | null; error: Error | null }>;
        };
      };
    },
    private readonly bucket: string
  ) {}

  async upload(path: string, bytes: Uint8Array, contentType: string): Promise<StoredObject> {
    const result = await this.client.storage.from(this.bucket).upload(path, bytes, { contentType, upsert: true });
    if (result.error || !result.data) throw result.error ?? new Error("Upload failed");
    return { key: result.data.path, url: result.data.path, size: bytes.byteLength, contentType };
  }

  async remove(path: string) {
    const result = await this.client.storage.from(this.bucket).remove([path]);
    if (result.error) throw result.error;
  }

  async exists(path: string) {
    const [folder, name] = path.includes("/") ? [path.slice(0, path.lastIndexOf("/")), path.slice(path.lastIndexOf("/") + 1)] : ["", path];
    const result = await this.client.storage.from(this.bucket).list(folder, { search: name });
    if (result.error) throw result.error;
    return Boolean(result.data?.length);
  }

  async signedUrl(path: string, expiresInSeconds = 900) {
    const result = await this.client.storage.from(this.bucket).createSignedUrl(path, expiresInSeconds);
    if (result.error || !result.data) throw result.error ?? new Error("Signed URL failed");
    return result.data.signedUrl;
  }
}
