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
  dev: 'https://consorcio-api.sp1.br.saveincloud.net.br' // <- ADICIONE o context-path
};

export const API_CONFIG = {
  BASE_URL: API_URLS.dev, // Fixo no dev
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
