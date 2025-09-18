// Detectar ambiente baseado na URL atual
const getCurrentEnvironment = (): 'dev' | 'staging' | 'local' => {
  const hostname = window.location.hostname;

  if (hostname.includes('disk-functionality-informal-markers')) {
    return 'staging';
  } else if (hostname.includes('repeated-transformation-tip-gap')) {
    return 'dev';
  } else {
    return 'local';
  }
};

const API_URLS = {
  local: 'https://consorcio-api-sp1.br.saveincloud.net.br',
  staging: 'https://republic-economies-sunday-parent.trycloudflare.com/consorcio-api',
  dev: 'http://192.168.40.70:30090/consorcio-api'
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
