// ============================================================
//  config.js — Multi-Provider AI Config
//  Supports Groq, Mistral, OpenRouter & more
// ============================================================

const CONFIG = {

  // ---------- Providers ----------
  providers: [
    {
      id: "groq",
      label: "Groq ⚡",
      baseUrl: "https://api.groq.com/openai/v1/chat/completions",
      keyPlaceholder: "gsk_...",
      keyHint: "Get free key at console.groq.com",
      authHeader: "Bearer",
      models: [
        {
          id: "llama-3.3-70b-versatile",
          label: "Llama 3.3 70B",
          description: "Best quality on Groq, super fast",
          inputPricePerMillion: 0.59,
          outputPricePerMillion: 0.79,
        },
        {
          id: "llama-3.1-8b-instant",
          label: "Llama 3.1 8B Instant",
          description: "Fastest model, great for quick tasks",
          inputPricePerMillion: 0.05,
          outputPricePerMillion: 0.08,
        },
        {
          id: "mixtral-8x7b-32768",
          label: "Mixtral 8x7B",
          description: "Great all-rounder with large context",
          inputPricePerMillion: 0.24,
          outputPricePerMillion: 0.24,
        },
        {
          id: "gemma2-9b-it",
          label: "Gemma 2 9B",
          description: "Google's Gemma model, fast & free",
          inputPricePerMillion: 0.20,
          outputPricePerMillion: 0.20,
        },
      ],
    },
    {
      id: "mistral",
      label: "Mistral AI",
      baseUrl: "https://api.mistral.ai/v1/chat/completions",
      keyPlaceholder: "...",
      keyHint: "Get free key at console.mistral.ai",
      authHeader: "Bearer",
      models: [
        {
          id: "mistral-small-latest",
          label: "Mistral Small",
          description: "Fast & cheap, great for most tasks",
          inputPricePerMillion: 0.20,
          outputPricePerMillion: 0.60,
        },
        {
          id: "mistral-medium-latest",
          label: "Mistral Medium",
          description: "Balanced performance",
          inputPricePerMillion: 2.70,
          outputPricePerMillion: 8.10,
        },
        {
          id: "open-mistral-nemo",
          label: "Mistral Nemo",
          description: "Free & open, 128k context",
          inputPricePerMillion: 0.15,
          outputPricePerMillion: 0.15,
        },
      ],
    },
    {
      id: "openrouter",
      label: "OpenRouter 🌐",
      baseUrl: "https://openrouter.ai/api/v1/chat/completions",
      keyPlaceholder: "sk-or-...",
      keyHint: "Get free key at openrouter.ai — access 100s of models",
      authHeader: "Bearer",
      models: [
        {
          id: "meta-llama/llama-3.3-70b-instruct:free",
          label: "Llama 3.3 70B (FREE)",
          description: "Completely free via OpenRouter",
          inputPricePerMillion: 0,
          outputPricePerMillion: 0,
        },
        {
          id: "google/gemma-3-27b-it:free",
          label: "Gemma 3 27B (FREE)",
          description: "Google's latest Gemma, free",
          inputPricePerMillion: 0,
          outputPricePerMillion: 0,
        },
        {
          id: "mistralai/mistral-7b-instruct:free",
          label: "Mistral 7B (FREE)",
          description: "Free Mistral via OpenRouter",
          inputPricePerMillion: 0,
          outputPricePerMillion: 0,
        },
        {
          id: "deepseek/deepseek-chat",
          label: "DeepSeek Chat",
          description: "Insanely cheap & powerful",
          inputPricePerMillion: 0.07,
          outputPricePerMillion: 1.10,
        },
      ],
    },
  ],

  // ---------- Defaults ----------
  defaults: {
    provider: "groq",
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    maxTokens: 1024,
    systemPrompt: "You are a helpful assistant.",
  },

  // ---------- Token / Cost Display ----------
  cost: {
    decimalPlaces: 6,
    currency: "USD",
  },

  // ---------- UI ----------
  ui: {
    appName: "Illias ✨",
    temperatureMin: 0,
    temperatureMax: 2,
    temperatureStep: 0.05,
    maxTokensMin: 256,
    maxTokensMax: 8192,
    maxTokensStep: 256,
  },

};

// Helper: get provider config
function getProviderConfig(providerId) {
  return CONFIG.providers.find((p) => p.id === providerId) || CONFIG.providers[0];
}

// Helper: get model config
function getModelConfig(modelId, providerId) {
  const provider = getProviderConfig(providerId);
  return provider.models.find((m) => m.id === modelId) || provider.models[0];
}

// Helper: estimate cost from token counts
function estimateCost(inputTokens, outputTokens, modelId, providerId) {
  const model = getModelConfig(modelId, providerId);
  const inputCost  = (inputTokens  / 1_000_000) * model.inputPricePerMillion;
  const outputCost = (outputTokens / 1_000_000) * model.outputPricePerMillion;
  return {
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
  };
}
