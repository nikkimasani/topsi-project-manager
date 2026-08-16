export class DBFile {
  private readonly storageKey: string;

  constructor(public readonly path: string) {
    this.storageKey = `nikki-project-manager:${path}`;
    if (window.localStorage.getItem(this.storageKey) == null) {
      window.localStorage.setItem(this.storageKey, "{}");
    }
  }

  public write(content: any) {
    window.localStorage.setItem(this.storageKey, content);
  }

  public async append(content: any) {
    const data = this.read() + content;
    this.write(data);
  }

  public read(): string {
    return window.localStorage.getItem(this.storageKey) || "{}";
  }
}
