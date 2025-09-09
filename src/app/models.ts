export interface ParametroRequest {
  valorCredito: number;
  prazo: number;
  taxaAdm: number;
  valorIndice: number;
  modalidade: string;
  mesContemplacaoList: number[];
  percentualVendaAte30: number;
  percentualVendaApos30: number;
  lance?: number;
  selic?: number;
  mesAtual?: number;
}

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
  rendimentoCdi: number;
}

export interface TabelaMensal {
  mes: number;
  creditoAtualizadoMensal: number;
  investimentoMensalCorrigido: number;
  valorInvestidoCorrigido: number;
  saldoDevedor: number;
}
