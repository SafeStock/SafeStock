// URL base da API (backend)
// Usa variável de ambiente ou /api (proxy reverso do load balancer)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// URL do WebSocket (baseada na API_BASE_URL)
export const WS_BASE_URL = API_BASE_URL.replace(/^http/, 'ws');

// Timeout padrão para requisições (ms)
export const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 30000;

// Configurações de ambiente
export const ENV = import.meta.env.MODE || 'development'; // 'development', 'production', 'staging'
export const IS_PRODUCTION = ENV === 'production';
export const IS_DEVELOPMENT = ENV === 'development';

// Nome da chave do token no storage
export const AUTH_TOKEN_KEY = 'authToken';

// Configurações de paginação padrão
export const DEFAULT_PAGE_SIZE = 5;
export const MAX_PAGE_SIZE = 100;
