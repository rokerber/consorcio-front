// Este ficheiro centraliza as "plantas" dos dados que trocamos com a API.

// Corresponde ao seu ParametroRequestDTO.java atualizado
export interface ParametroRequest {
  valorCredito: number;
  prazo: number;
  taxaAdm: number;
  incc: number;
  modalidade: string;
  mesContemplacaoList: number[];
  lance?: number;
  recompra30?: number;
  acima30?: number;
  selic?: number;
  mesAtual?: number;
}

// Corresponde ao seu SimulacaoDTO.java
export interface Simulacao {
  cota: number;
  mesContemplacao: number;
  formaContemplacao: string;
  creditoAtualizado: number;
  investimentoMensalCorrigido: number;
  valorInvestidoCorrigido: number;
  parcelaPosContemplacao: number;
  valorVenda: number;
  ir: number;
  lucroLiquido: number;
  retornSobCapitalInvest: string;
  estrategia: string;
  rendimentoCdi: number; // NOVO CAMPO ADICIONADO
}

// Corresponde ao TabelaMensalDTO.java
export interface TabelaMensal {
  mes: number;
  creditoAtualizadoMensal: number;
  investimentoMensalCorrigido: number;
  valorInvestidoCorrigido: number;
  saldoDevedor: number;
}

