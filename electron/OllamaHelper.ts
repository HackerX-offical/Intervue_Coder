const VISION_NAME_PATTERNS = [
  /vision/i,
  /llava/i,
  /bakllava/i,
  /minicpm-v/i,
  /moondream/i,
  /granite.*vision/i,
  /qwen.*vl/i,
  /internvl/i,
];

export function normalizeOllamaUrls(baseUrl: string): {
  openAiBaseUrl: string;
  apiRoot: string;
} {
  const trimmed = (baseUrl || 'http://localhost:11434/v1').trim().replace(/\/+$/, '');
  const withoutV1 = trimmed.replace(/\/v1$/i, '');
  const apiRoot = withoutV1 || 'http://localhost:11434';
  const openAiBaseUrl = `${apiRoot}/v1`;
  return { openAiBaseUrl, apiRoot };
}

export function isLikelyVisionModel(name: string): boolean {
  return VISION_NAME_PATTERNS.some((pattern) => pattern.test(name));
}

export async function fetchOllamaModelNames(
  baseUrl?: string,
): Promise<{ models: string[]; openAiBaseUrl: string }> {
  const { apiRoot, openAiBaseUrl } = normalizeOllamaUrls(baseUrl || 'http://localhost:11434/v1');

  const response = await fetch(`${apiRoot}/api/tags`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Ollama returned ${response.status}. Is \`ollama serve\` running?`);
  }

  const data = (await response.json()) as {
    models?: Array<{ name: string }>;
  };

  const models = (data.models ?? [])
    .map((m) => m.name)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  return { models, openAiBaseUrl };
}

export function pickOllamaDefaultModels(modelNames: string[]): {
  extractionModel: string;
  solutionModel: string;
  debuggingModel: string;
} {
  if (modelNames.length === 0) {
    return { extractionModel: '', solutionModel: '', debuggingModel: '' };
  }

  const visionModel = modelNames.find((name) => isLikelyVisionModel(name)) ?? modelNames[0];
  const textModel = modelNames.find((name) => name !== visionModel) ?? modelNames[0];

  return {
    extractionModel: visionModel,
    solutionModel: textModel,
    debuggingModel: visionModel,
  };
}

export function reconcileOllamaModelSelection(
  modelNames: string[],
  current: {
    extractionModel: string;
    solutionModel: string;
    debuggingModel: string;
  },
): {
  extractionModel: string;
  solutionModel: string;
  debuggingModel: string;
} {
  if (modelNames.length === 0) {
    return current;
  }

  const pick = (value: string) => (value && modelNames.includes(value) ? value : modelNames[0]);

  return {
    extractionModel: pick(current.extractionModel),
    solutionModel: pick(current.solutionModel),
    debuggingModel: pick(current.debuggingModel),
  };
}
