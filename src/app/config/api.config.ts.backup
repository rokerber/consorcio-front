// Detectar ambiente baseado na URL atual
const getCurrentEnvironment = (): 'dev' | 'staging' | 'local' => {
  const hostname = window.location.hostname;

  if (hostname.includes('disk-functionality-informal-markers')) {
    return 'staging';
  } else if (hostname.includes('kde-bill-owen-vice')) {
    return 'dev';
  } else {
    return 'local';
  }
};

const API_URLS = {
  dev: 'https://checked-refurbished-marks-miniature.trycloudflare.com/consorcio-api',
  staging: 'https://lands-creativity-mlb-text.trycloudflare.com/consorcio-api',
  local: 'http://192.168.40.70:30090/consorcio-api'
};

export const API_CONFIG = {
  BASE_URL: API_URLS[getCurrentEnvironment()],

  ENDPOINTS: {
    SIMULACOES: '/api/simulacoes',
    SIMULACOES_MENSAL: '/api/simulacoes/mensal',
    SIMULACOES_ANUAL: '/api/simulacoes/anual',
    SIMULACOES_SOMA: '/api/simulacoes/soma'
  }
};

export function getApiUrl(endpoint: string): string {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}
