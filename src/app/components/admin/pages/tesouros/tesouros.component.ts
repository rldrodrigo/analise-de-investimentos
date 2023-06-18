import { Component, OnInit, ElementRef } from '@angular/core';
import { TreasuryboundService } from 'src/app/services/treasurybound.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TesouroComponent } from './tesouro/tesouro.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';


export interface Tesouro {
  dataVenda: string;
  PU: number;
  quantidade: number;
  tipoTitulo: string;
  valor: number;
  vencimento: string;
}

@Component({
  selector: 'app-tesouros',
  templateUrl: './tesouros.component.html',
  styleUrls: ['./tesouros.component.scss'],
})
export class TesourosComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['Tipo Titulo', 'Vencimento do Titulo', 'Data Venda', 'PU', 'Quantidade', 'Valor', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  TiposDeTitulos: Array<string> = [
    "Tesouro IGPM+ com Juros Semestrais",
    "Tesouro Selic",
    "Tesouro IPCA+",
    "Tesouro IPCA+ com Juros Semestrais",
   "Tesouro Prefixado com Juros Semestrais",
   "Tesouro Prefixado",
  ];
  selecionou: boolean = false;
  selecionouComparativo: boolean = false;

  listaDataVencimento: any  = [];
  listaDataVencimentoComparativo: any = [];

  graphicLabels: string[] = [];
  graphicLabelsComparativo: string[] = [];

  graphicData: any = [];
  graphicComparativoData: any = [];

  graphicTaxas: any = [];
  graphicTaxasComparativo: any = [];

  graficoQuantidade: any = []
  graficoQuantidadeComparativo: any = [];

  graphicTaxaRetorno: any = [];
  graphicTaxaRetornoComparativo: any = [];


  graphicRiscoData: any = [];
  graphicRiscoDataComparativo: any = [];

  graphicVaRData: any = [];
  graphicVaRDataComparativo: any = [];

  tesouros: any = [];
  tesourosComparativo: any = [];
  pesquisou: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild("meuCanvas", { static: true }) elemento!: ElementRef;

  chart: any = [];
  chart2: any = [];
  chart3: any = [];
  chart4: any = [];
  chartRisco: any = [];
  chartVaR: any = [];
  tesouroForm1: FormGroup;
  tesouroForm2: FormGroup;
  tesouroDate: FormGroup;


  constructor(
    private trasuryBoundService: TreasuryboundService,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    Chart.register(...registerables);
    this.tesouroForm1 = this.fb.group({
      tipo: ['', Validators.required],
      dataVencimento: [''],
    });
    this.tesouroForm2 = this.fb.group({
      comparativo: [''],
      dataComparativo: ['']
    });
    this.tesouroDate = this.fb.group({
      initialDate: ['', Validators.required],
      finalDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  getData() {
    if(this.comparativo.value) {
      this.trasuryBoundService.listTreasuriesBound(this.comparativo.value, this.dataComparativo.value, this.initialDate.value, this.finalDate.value).then((res) => {
        this.tesourosComparativo = res;

        let initialDate = this.initialDate.value.split("-");
        initialDate = new Date(initialDate[0], initialDate[1]-1, initialDate[2]);

        let finalDate =  this.finalDate.value.split("-");
        finalDate = new Date(finalDate[0], finalDate[1]-1, finalDate[2]);

        this.graphicComparativoData = [];
        this.graficoQuantidadeComparativo = [];

        res.map((item: any) => {
          let dataPrecoUnitarioComparativo = {
            x: `${item['data_venda']['$date'].substring(8, 10)}/${item['data_venda']['$date'].substring(5, 7)}/${item['data_venda']['$date'].substring(0, 4)}`,
            y: item['PU'],
          };
          let dataQuantidadeComparativo = {
            x: `${item['data_venda']['$date'].substring(8, 10)}/${item['data_venda']['$date'].substring(5, 7)}/${item['data_venda']['$date'].substring(0, 4)}`,
            y: item['quantidade'],
          };
          this.graficoQuantidadeComparativo.push(dataQuantidadeComparativo);
          this.graphicComparativoData.push(dataPrecoUnitarioComparativo);
        });
        this.getGraphicData();
      });
    } else {
      this.getGraphicData();
    }
  }

  getGraphicData() {
    this.trasuryBoundService.listTreasuriesBound(this.tipo.value,  this.dataVencimento.value, this.initialDate.value, this.finalDate.value).then((res) => {
      this.tesouros = res;
      let initialDate = this.initialDate.value.split("-");
      initialDate = new Date(initialDate[0], initialDate[1]-1, initialDate[2]);
      let finalDate =  this.finalDate.value.split("-");
      finalDate = new Date(finalDate[0], finalDate[1]-1, finalDate[2]);
      this.dataSource = new MatTableDataSource(this.tesouros);
      this.dataSource.paginator = this.paginator;
      this.graphicData = [];
      this.graficoQuantidade = [];
      res.map((item: any) => {
        let dataPrecoUnitario = {
          x: `${item['data_venda']['$date'].substring(8, 10)}/${item['data_venda']['$date'].substring(5, 7)}/${item['data_venda']['$date'].substring(0, 4)}`,
          y: item['PU'],
        };
        let dataQuantidade = {
          x: `${item['data_venda']['$date'].substring(8, 10)}/${item['data_venda']['$date'].substring(5, 7)}/${item['data_venda']['$date'].substring(0, 4)}`,
          y: item['quantidade'],
        };
        this.graficoQuantidade.push(dataQuantidade);
        this.graphicData.push(dataPrecoUnitario);
      });
      this.criaGrafico();
      this.criarGraficoQuantidade();
    });
  }


  getDataTaxa() {
    if(this.comparativo.value) {
      this.trasuryBoundService.listarTesourosTaxa(this.comparativo.value, this.dataComparativo.value, this.initialDate.value, this.finalDate.value).then((res) => {
        this.graphicTaxasComparativo = [];
        this.graphicTaxaRetornoComparativo = [];
        this.graphicRiscoDataComparativo = [];
        this.graphicVaRDataComparativo = [];
        res.map((item: any) => {
          let taxaComparativo = {
            x: `${item['data_base']['$date'].substring(8, 10)}/${item['data_base']['$date'].substring(5, 7)}/${item['data_base']['$date'].substring(0, 4)}`,
            y: item['taxa_compra_manha'],
          };
          let TaxaRetornoComparativo = {
            x: `${item['data_base']['$date'].substring(8, 10)}/${item['data_base']['$date'].substring(5, 7)}/${item['data_base']['$date'].substring(0, 4)}`,
            y: item['taxa_retorno_logaritmica'],
          };
          let riscoComparativo = {
            x: `${item['data_base']['$date'].substring(8, 10)}/${item['data_base']['$date'].substring(5, 7)}/${item['data_base']['$date'].substring(0, 4)}`,
            y: item['risco'],
          };
          let valueAtRiskComparativo = {
            x: `${item['data_base']['$date'].substring(8, 10)}/${item['data_base']['$date'].substring(5, 7)}/${item['data_base']['$date'].substring(0, 4)}`,
            y: item['value_at_risk'],
          }
          this.graphicTaxasComparativo.push(taxaComparativo);
          this.graphicTaxaRetornoComparativo.push(TaxaRetornoComparativo);
          this.graphicRiscoDataComparativo.push(riscoComparativo);
          this.graphicVaRDataComparativo.push(valueAtRiskComparativo);
        });
        this.getGraphicDataTaxa();
      })
    } else {
      this.getGraphicDataTaxa();
    }

  }

  getGraphicDataTaxa() {
    this.trasuryBoundService.listarTesourosTaxa(this.tipo.value, this.dataVencimento.value, this.initialDate.value, this.finalDate.value).then((res) => {
      this.graphicTaxas = [];
      this.graphicTaxaRetorno = [];
      this.graphicRiscoData = [];
      this.graphicVaRData = [];
      res.map((item: any) => {
        let newItem = {
          x: `${item['data_base']['$date'].substring(8, 10)}/${item['data_base']['$date'].substring(5, 7)}/${item['data_base']['$date'].substring(0, 4)}`,
          y: item['taxa_compra_manha'],
        };
        let TaxaRetorno = {
          x: `${item['data_base']['$date'].substring(8, 10)}/${item['data_base']['$date'].substring(5, 7)}/${item['data_base']['$date'].substring(0, 4)}`,
          y: item['taxa_retorno_logaritmica'],
        };
        let risco = {
          x: `${item['data_base']['$date'].substring(8, 10)}/${item['data_base']['$date'].substring(5, 7)}/${item['data_base']['$date'].substring(0, 4)}`,
          y: item['risco'],
        };
        let valueAtRisk = {
          x: `${item['data_base']['$date'].substring(8, 10)}/${item['data_base']['$date'].substring(5, 7)}/${item['data_base']['$date'].substring(0, 4)}`,
          y: item['value_at_risk'],
        }
        this.graphicTaxas.push(newItem);
        this.graphicTaxaRetorno.push(TaxaRetorno);
        this.graphicRiscoData.push(risco);
        this.graphicVaRData.push(valueAtRisk);
      });

      this.pesquisou = true;
      this.criaGraficoTaxa();
      this.criaGraficoTaxaRetorno();
      this.criaGraficoRisco();
      this.criaGraficoVaR();
    })
  }

  AbrirModalTesouro(item: any){
    this.dialog.open(TesouroComponent, {
      data : {
        tesouro: item,
        graphicTaxaRetorno: this.graphicTaxaRetorno,
        comparativo: this.comparativo.value,
        comparativoData: this.dataComparativo.value,
        graphicTaxaRetornoComparativo: this.graphicTaxaRetornoComparativo,
      },
      maxWidth: '80%',
      minWidth: '30%',
      autoFocus: false,
      closeOnNavigation: true
    })
    .afterClosed()
    .subscribe(result => {
      if (result) {

      }
    });
  }

  criaGrafico() {
    if(this.comparativo.value) {
      this.chart = new Chart('canvas', {
        type : 'line',
        data: {
          datasets: [
            {
              label: `${this.tipo.value} ${this.dataVencimento.value}`,
              data: this.graphicData,
              borderColor: '#6200EE',
              backgroundColor: '#6200EE55',
              fill: true,
            },
            {
              label: `${this.comparativo.value} ${this.dataComparativo.value}`,
              data: this.graphicComparativoData,
              borderColor: '#933FFA',
              backgroundColor: '#933FFA55',
              fill: true,
            }
          ]
        },
        options:  this.createChartOptions('Preço Unitário', 24),
      });

    } else {
      this.chart = new Chart('canvas', {
        type : 'line',
        data: {
          datasets: [{
            label: `${this.tipo.value} ${this.dataVencimento.value}`,
            data: this.graphicData,
            borderColor: '#6200EE',
            backgroundColor: '#6200EE55 ',
            fill: true,
          }]
        },
        options: this.createChartOptions('Preço Unitário', 24),
      });
    }
  }

  criaGraficoTaxa(){
    if(this.comparativo.value) {
      this.chart2 = new Chart('precoTaxa', {
        type : 'line',
        data: {
          datasets: [{
            label: `${this.tipo.value} ${this.dataVencimento.value}`,
            data: this.graphicTaxas,
            borderColor: '#6200EE',
            backgroundColor: '#6200EE55 ',
            fill: true,
          }, {
            label: `${this.comparativo.value} ${this.dataComparativo.value}`,
            data: this.graphicTaxasComparativo,
            borderColor: '#933FFA',
            backgroundColor: '#933FFA55',
            fill: true,
          }]
        },
        options: this.createChartOptions('Valor da Taxa', 24),
      });
    } else {
      this.chart2 = new Chart('precoTaxa', {
        type : 'line',
        data: {
          datasets: [{
            label: `${this.tipo.value} ${this.dataVencimento.value}`,
            data: this.graphicTaxas,
            borderColor: '#6200EE',
            fill: true,
            backgroundColor: '#6200EE55',
          }]
        },
        options: this.createChartOptions('Valor da Taxa', 24),
      });
    }
  }

  criarGraficoQuantidade(){
    if(this.comparativo.value) {
      this.chart3 = new Chart('quantidadeVendas', {
        type : 'bar',
        data: {
          datasets: [{
            label: `${this.tipo.value} ${this.dataVencimento.value}`,
            data: this.graficoQuantidade,
            backgroundColor: "#8133f1",
            borderColor: '#b78af7',
            borderWidth: 2,
          }, {
            label: `${this.comparativo.value} ${this.dataComparativo.value}`,
            data: this.graficoQuantidadeComparativo,
            backgroundColor: "#b78af7",
            borderColor: '#8133f1',
            borderWidth: 2,
          }]
        },
        options: this.createChartOptions('Volume de Vendas', 24),
      });
    } else {
      this.chart3 = new Chart('quantidadeVendas', {
        type : 'bar',
        data: {
          datasets: [{
            label: `${this.tipo.value} ${this.dataVencimento.value}`,
            data: this.graficoQuantidade,
            backgroundColor: "#8133f1",
            borderColor: '#b78af7',
            borderWidth: 2,
          }]
        },
        options: this.createChartOptions('Volume de Vendas', 24),
      });
    }
  }

  submitForm(): void {
    if (!this.tesouroForm1.invalid && !this.tesouroDate.invalid) {
        this.getData();
        this.getDataTaxa();
        this.pesquisou = true;
    }
  }

  selecionaPapel(titulo: string){
    this.listaDataVencimento = [];
    this.trasuryBoundService.listaAnoVencimento(titulo).then(res => {
      this.selecionou = true;
      this.listaDataVencimento = res;
    })
  }

  selecionaPapelComparativo(titulo: string){
    this.listaDataVencimentoComparativo = [];
    this.trasuryBoundService.listaAnoVencimento(titulo).then(res => {
      this.selecionouComparativo = true;
      this.listaDataVencimentoComparativo = res;
    })
  }

  novaConsulta() {
    this.pesquisou = false;
  }

  criaGraficoTaxaRetorno() {
    if(this.comparativo.value) {
      const taxaRetornoData = this.graphicTaxaRetorno.slice();
      taxaRetornoData.shift();
      const taxaRetornoComparativoData = this.graphicTaxaRetornoComparativo.slice();
      taxaRetornoComparativoData.shift()
      this.chart4 = new Chart('taxaRetorno', {
        type : 'line',
        data: {
          datasets: [
            {
              label: `${this.tipo.value} ${this.dataVencimento.value}`,
              data: taxaRetornoData,
              borderColor: '#6200EE',
              backgroundColor: '#6200EE55 ',
              fill: true,
            },
            {
              label: `${this.comparativo.value} ${this.dataComparativo.value}`,
              data: taxaRetornoComparativoData,
              borderColor: '#933FFA',
              backgroundColor: '#933FFA55',
              fill: true,
            },
          ]
        },
        options: this.createChartOptions('Taxa de Retorno', 24),
      });
    } else {
      const taxaRetornoData = this.graphicTaxaRetorno.slice();
      taxaRetornoData.shift();
      this.chart4 = new Chart('taxaRetorno', {
        type : 'line',
        data: {
          datasets: [
            {
              label: `${this.tipo.value} ${this.dataVencimento.value}`,
              data: taxaRetornoData,
              borderColor: '#6200EE',
              backgroundColor: '#6200EE55 ',
              fill: true,
            },
          ]
        },
        options: this.createChartOptions('Taxa de Retorno', 24),
      });
    }
  }


  criaGraficoRisco() {
    if (!this.comparativo.value) {
      this.chartRisco = new Chart('risco', {
        type : 'line',
        data: {
          datasets: [
            {
              label: `${this.tipo.value} ${this.dataVencimento.value}`,
              data: this.graphicRiscoData,
              borderColor: '#6200EE',
              backgroundColor: '#6200EE55 ',
              fill: true,
            },
          ]
        },
        options: this.createChartOptions('Risco do título', 24),
      });
    } else {
      this.chartRisco = new Chart('risco', {
        type : 'line',
        data: {
          datasets: [
            {
              label: `${this.tipo.value} ${this.dataVencimento.value}`,
              data: this.graphicRiscoData,
              borderColor: '#6200EE',
              backgroundColor: '#6200EE55 ',
              fill: true,
            },
            {
              label: `${this.comparativo.value} ${this.dataComparativo.value}`,
              data:  this.graphicRiscoDataComparativo,
              borderColor: '#933FFA',
              backgroundColor: '#933FFA55',
              fill: true,
            },
          ]
        },
        options: this.createChartOptions('Risco do título', 24),
      });
      }
  }

  criaGraficoVaR() {
    if (!this.comparativo.value) {
      this.chartVaR = new Chart('value-at-risk', {
        type : 'line',
        data: {
          datasets: [
            {
              label: `${this.tipo.value} ${this.dataVencimento.value}`,
              data: this.graphicVaRData,
              borderColor: '#6200EE',
              backgroundColor: '#6200EE55 ',
              fill: true,
            },
          ]
        },
        options: this.createChartOptions('Value at Risk', 24),
      });
    } else {
      this.chartVaR = new Chart('value-at-risk', {
        type : 'line',
        data: {
          datasets: [
            {
              label: `${this.tipo.value} ${this.dataVencimento.value}`,
              data: this.graphicVaRData,
              borderColor: '#6200EE',
              backgroundColor: '#6200EE55 ',
              fill: true,
            },
            {
              label: `${this.comparativo.value} ${this.dataComparativo.value}`,
              data:  this.graphicVaRDataComparativo,
              borderColor: '#933FFA',
              backgroundColor: '#933FFA55',
              fill: true,
            },
          ]
        },
        options: this.createChartOptions('Value at Risk', 24),
      });
      }
  }

  createChartOptions(text: string, fontSize: number) {
    const options:any = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels : {
            font: {
              size: fontSize
            }
          }
        },
        title: {
          display: true,
          text: text,
          font: {
            size: fontSize
          }
        }
      },
    };
    return options;
  }

  get initialDate() {
    return this.tesouroDate.get('initialDate') as FormControl;
  }

  get finalDate() {
    return this.tesouroDate.get('finalDate') as FormControl;
  }

  get tipo() {
    return this.tesouroForm1.get('tipo') as FormControl;
  }

  get dataVencimento() {
    return this.tesouroForm1.get('dataVencimento') as FormControl;
  }

  get comparativo() {
    return this.tesouroForm2.get('comparativo') as FormControl;
  }

  get dataComparativo() {
    return this.tesouroForm2.get('dataComparativo') as FormControl;
  }
}
