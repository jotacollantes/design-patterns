class ConfigManager {
  private config: Record<string, string> = {};

  public setConfig(key: string, value: string): void {
    this.config[key] = value;
  }

  public getConfig(key: string): string | null {
    return this.config[key];
  }

  public getAllConfig(): Record<string, string> {
    //Para evitar manipulacion se returna un nuevo objeto
    return {...this.config};
  }
}
//Exportamos una sola instancia de la clase ConfigManager
export const configManager = new ConfigManager();