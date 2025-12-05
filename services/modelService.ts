import { NORMAL_API_URL, NORMAL_MODEL, PROMPT_COUPLET_GENERATION, PROMPT_NAME_PARSING } from '../constants';
import { AppSettings, CoupletData, ModelResponse, ParsedName } from '../types';

const callModel = async (settings: AppSettings, systemPrompt: string, userContent: string): Promise<string> => {
  if (!settings.apiKey) throw new Error("API Key is missing");

  // Use custom base URL if provided, otherwise default. Ensure no trailing slash for clean appending.
  const baseUrl = settings.baseUrl ? settings.baseUrl.replace(/\/$/, '') : 'https://api.deepseek.com';
  // Construct full URL. If the user input a full path ending in v1/chat/completions, use it, otherwise append.
  const endpoint = baseUrl.includes('/chat/completions') ? baseUrl : `${baseUrl}/chat/completions`;

  const model = settings.model || NORMAL_MODEL;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.apiKey}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      stream: false,
      response_format: { type: 'json_object' } // Force JSON mode
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`API Error: ${response.status} ${JSON.stringify(errorData)}`);
  }

  const data: ModelResponse = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) throw new Error("No content received from API");
  return content;
};

export const parseName = async (name: string, settings: AppSettings): Promise<ParsedName> => {
  const jsonStr = await callModel(settings, PROMPT_NAME_PARSING, `输入：“${name}”`);
  
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse name JSON:", jsonStr);
    throw new Error("Failed to parse name result.");
  }
};

export const generateCouplet = async (parsedName: ParsedName, settings: AppSettings): Promise<CoupletData> => {
  const parsedNameStr = JSON.stringify(parsedName);
  const jsonStr = await callModel(settings, PROMPT_COUPLET_GENERATION, `解析数据：${parsedNameStr}`);

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
     console.error("Failed to parse couplet JSON:", jsonStr);
    throw new Error("Failed to parse couplet result.");
  }
};