// Este ficheiro centraliza as "plantas" dos dados que trocamos com a API.

// Corresponde ao seu ParametroRequestDTO.java atualizado
export interface ParametroRequest {
  valorCredito: number;
  prazo: number;
  taxaAdm: number;
  incc: number;
  modalidade: string;
  mesContemplacaoList: number[];

  // NOVOS CAMPOS ADICIONADOS
  percentualVendaAte30: number;
  percentualVendaApos30: number;

  lance?: number;
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
  rendimentoCdi: number;
}

// Corresponde ao TabelaMensalDTO.java
export interface TabelaMensal {
  mes: number;
  creditoAtualizadoMensal: number;
  investimentoMensalCorrigido: number;
  valorInvestidoCorrigido: number;
  saldoDevedor: number;
}

