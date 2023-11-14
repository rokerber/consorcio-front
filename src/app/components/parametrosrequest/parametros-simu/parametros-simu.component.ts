import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SimulacaoService } from 'src/app/services/simulacao.service';
import { ParametrosRequest } from '../../models/parametrosrequest';
import { TabelaPrincipal } from '../../models/tabelaprincipal';
import { SimulacaoReajusteService } from 'src/app/services/simulacao.reajuste.service';
import { TabelaReajuste } from '../../models/tabelareajuste';



@Component({
  selector: 'app-parametros-simu',
  templateUrl: './parametros-simu.component.html',
  styleUrls: ['./parametros-simu.component.css'],
})


export class ParametrosSimuComponent implements OnInit {


  parametrosrequest: ParametrosRequest = {
    modalidade: '',
    prazo: '',
    valorCredito: '',
    incc: '',
    lance: '',
    taxaAdm: '',
    mesAtual: '',
  }

  tabelaprincipal: TabelaPrincipal[] = []
  tabelareajuste: TabelaReajuste[] = []

  modalidade: UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  prazo: UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  valorCredito: UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  incc: UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  lance: UntypedFormControl = new UntypedFormControl(null)
  taxaAdm: UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  mesAtual: UntypedFormControl = new UntypedFormControl(null, [Validators.required])


  constructor(
    private simulacaoService: SimulacaoService,
    private simulacaoReajusteService: SimulacaoReajusteService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.parametrosrequest = this.simulacaoService.listParametrosRequest(); 
   }


  simularTabelaPrincipal(): void {
    this.simulacaoService.storeParametrosRequest(this.parametrosrequest);
    this.simulacaoService.simulate(this.parametrosrequest).subscribe(resposta => {
        this.tabelaprincipal = resposta;
        this.simulacaoService.storeSimulationResult(this.tabelaprincipal);
        this.router.navigate(['tabelaprincipal/list']);
        this.toastrService.success('Simulação feita com sucesso!', 'Simulação');
      }, err => {
        this.toastrService.error(err.message);
      })
  }

  simularTabelaReajuste(): void {
    this.simulacaoReajusteService.storeParametrosRequest(this.parametrosrequest);
    this.simulacaoReajusteService.simulate(this.parametrosrequest)
      .subscribe(resposta => {
        this.tabelareajuste = resposta;
        this.simulacaoReajusteService.storeSimulationResult(this.tabelareajuste);
        this.router.navigate(['tabelareajuste/list']);
        this.toastrService.success('Simulação feita com sucesso', 'Simulação');
      }, err => {
        this.toastrService.error(err.message);
      })
  }

  simularTodasTabelas(): void {
    this.simulacaoService.storeParametrosRequest(this.parametrosrequest);
    this.simulacaoReajusteService.storeParametrosRequest(this.parametrosrequest);
    this.simulacaoService.simulate(this.parametrosrequest).subscribe(resposta => {
      this.tabelaprincipal = resposta;
      this.simulacaoService.storeSimulationResult(this.tabelaprincipal);
      this.router.navigate(['tabelaprincipal/list']);
      this.toastrService.success('Simulação feita com sucesso', 'Simulação');
    }, err => {
      this.toastrService.error(err.message);
    })

    this.simulacaoReajusteService.simulate(this.parametrosrequest).subscribe(resposta => {
      this.tabelareajuste = resposta;
      this.simulacaoReajusteService.storeSimulationResult(this.tabelareajuste);
    }, err => {
      this.toastrService.error(err.message);
    })
  }

  cancelar(): void {
    this.router.navigate(['home']);
  }

  validaCampos(): boolean {
    return this.modalidade.valid && this.prazo.valid &&
      this.valorCredito.valid && this.incc.valid && this.taxaAdm.valid &&
      this.mesAtual.valid;
  }
}
