import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../services/api';
import { ParametroRequest, Simulacao, TabelaMensal } from '../../models';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-simulacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './simulacao.html',
  styleUrl: './simulacao.css'
})
export class SimulacaoComponent implements OnInit {

  simulationForm!: FormGroup;
  simulationResult: Simulacao[] | null = null;
  isLoading = false;
  error: string | null = null;
  chart: any;
  isModalVisible = false;
  isModalLoading = false;
  modalError: string | null = null;
  monthlyDetails: TabelaMensal[] | null = null;
  selectedSimulacao: Simulacao | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.simulationForm = this.fb.group({
      parametrosPrincipais: this.fb.group({
        valorCredito: [100000, [Validators.required, Validators.min(1000)]],
        prazo: [120, [Validators.required, Validators.min(12)]],
        taxaAdm: [15, [Validators.required, Validators.min(0)]],
        incc: [0.7, [Validators.required, Validators.min(0)]],
        modalidade: ['CHEIA', Validators.required],
        lance: [0],
        selic: [10.5],
        // NOVOS FORM CONTROLS ADICIONADOS COM VALORES PADRÃO
        percentualVendaAte30: [15, [Validators.required, Validators.min(0)]],
        percentualVendaApos30: [20, [Validators.required, Validators.min(0)]]
      }),
      cenarios: this.fb.array([])
    });
    this.adicionarCenario();
  }

  get cenarios() {
    return this.simulationForm.get('cenarios') as FormArray;
  }

  novoCenario(): FormGroup {
    const proximoMesSugerido = this.cenarios.length > 0 ? (this.cenarios.at(this.cenarios.length - 1).get('mesContemplacao')?.value || 0) + 6 : 6;
    return this.fb.group({
      mesContemplacao: [proximoMesSugerido, [Validators.required, Validators.min(1)]]
    });
  }

  adicionarCenario(): void {
    this.cenarios.push(this.novoCenario());
  }

  removerCenario(index: number): void {
    if (this.cenarios.length > 1) {
      this.cenarios.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.simulationForm.invalid) {
      console.error('Formulário inválido!', this.simulationForm.value);
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.simulationResult = null;

    const principais = this.simulationForm.get('parametrosPrincipais')?.value;
    const mesesContemplacao = this.cenarios.value.map((cenario: any) => Number(cenario.mesContemplacao));

    const requestPayload: ParametroRequest = {
      valorCredito: Number(principais.valorCredito),
      prazo: Number(principais.prazo),
      taxaAdm: Number(principais.taxaAdm),
      incc: Number(principais.incc),
      modalidade: principais.modalidade,
      lance: Number(principais.lance || 0),
      mesContemplacaoList: mesesContemplacao,
      selic: Number(principais.selic || 10.5),
      // NOVOS CAMPOS ENVIADOS PARA A API
      percentualVendaAte30: Number(principais.percentualVendaAte30),
      percentualVendaApos30: Number(principais.percentualVendaApos30)
    };

    this.apiService.simularConsorcio(requestPayload)
      .subscribe({
        next: (resultado) => {
          this.simulationResult = resultado;
          this.isLoading = false;
          setTimeout(() => this.renderChart(), 0);
        },
        error: (err: any) => {
          console.error('Erro ao chamar a API:', err);
          this.error = 'Não foi possível obter a simulação. Verifique a consola para mais detalhes.';
          this.isLoading = false;
        }
      });
  }

  renderChart(): void {
    if (!this.simulationResult) return;
    if (this.chart) {
      this.chart.destroy();
    }
    const labels = this.simulationResult.map(res => `Cenário ${res.cota} (Mês ${res.mesContemplacao})`);
    const lucroData = this.simulationResult.map(res => res.lucroLiquido);
    const cdiData = this.simulationResult.map(res => res.rendimentoCdi);
    const canvas = document.getElementById('comparisonChart') as HTMLCanvasElement;
    if (canvas) {
      this.chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Lucro Líquido (Consórcio)',
              data: lucroData,
              backgroundColor: '#28a745',
            },
            {
              label: 'Rendimento Equivalente (CDI)',
              data: cdiData,
              backgroundColor: '#007bff',
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value: string | number) {
                  if (typeof value === 'number') {
                    return 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                  }
                  return value;
                }
              }
            }
          }
        }
      });
    }
  }

  onViewDetails(simulacao: Simulacao): void {
    this.selectedSimulacao = simulacao;
    this.isModalVisible = true;
    this.isModalLoading = true;
    this.modalError = null;
    this.monthlyDetails = null;

    const principais = this.simulationForm.get('parametrosPrincipais')?.value;

    const requestPayload: ParametroRequest = {
      valorCredito: Number(principais.valorCredito),
      prazo: Number(principais.prazo),
      taxaAdm: Number(principais.taxaAdm),
      incc: Number(principais.incc),
      modalidade: principais.modalidade,
      mesContemplacaoList: [simulacao.mesContemplacao],
      selic: Number(principais.selic || 10.5),
      lance: Number(principais.lance || 0),
      mesAtual: new Date().getMonth() + 1,
      // NOVOS CAMPOS ENVIADOS TAMBÉM NA CHAMADA DE DETALHES
      percentualVendaAte30: Number(principais.percentualVendaAte30),
      percentualVendaApos30: Number(principais.percentualVendaApos30)
    };

    this.apiService.simularMensal(requestPayload).subscribe({
      next: (details) => {
        this.monthlyDetails = details;
        this.isModalLoading = false;
      },
      error: (err: any) => {
        console.error('Erro ao buscar detalhes mensais:', err);
        this.modalError = 'Não foi possível carregar os detalhes.';
        this.isModalLoading = false;
      }
    });
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedSimulacao = null;
  }
}
