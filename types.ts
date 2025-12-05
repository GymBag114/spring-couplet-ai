export interface ParsedName {
  xing: string;
  ming1: string;
  ming2: string;
}

export interface CoupletData {
  shanglian: string;
  xialian: string;
  hengpi: string;
}

export interface DeepSeekResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export enum AppStep {
  IDLE = 'IDLE',
  PARSING = 'PARSING',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface AppSettings {
  apiKey: string;
  baseUrl: string;
  model: string;
}