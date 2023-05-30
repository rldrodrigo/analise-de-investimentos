import { Component, OnInit, ElementRef } from '@angular/core';
import { TreasuryboundService } from 'src/app/services/treasurybound.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TesouroComponent } from './tesouro/tesouro.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  styleUrls: ['./tesouros.component.scss']
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

  graphicTaxasLabels: any = [];
  graphicTaxas: any = [];
  graphicTaxasComparativo: any = [];

  graficoQuantidadeLabels: any = [];
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
  @ViewChild("meuCanvas", { static: true }) elemento!: ElementRef;

  chart: any = [];
  chart2: any = [];
  chart3: any = [];
  chart4: any = [];
  chartRisco: any = [];
  chartVaR: any = [];
  tesouroForm: FormGroup;

  constructor(
    private trasuryBoundService: TreasuryboundService,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    Chart.register(...registerables);
    this.tesouroForm = this.fb.group({
      initialDate: ['', Validators.required],
      finalDate: ['', Validators.required],
      tipo: ['', Validators.required],
      comparativo: [''],
      dataVencimento: [''],
      dataComparativo: ['']
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  getData(tipo_titulo: string, ano_vencimento: string) {
    this.trasuryBoundService.listTreasuriesBound(tipo_titulo, ano_vencimento, this.initialDate.value, this.finalDate.value).then((res) => {
      this.tesouros = res;

      let initialDate = this.initialDate.value.split("-");
      initialDate = new Date(initialDate[0], initialDate[1]-1, initialDate[2]);
      let finalDate =  this.finalDate.value.split("-");
      finalDate = new Date(finalDate[0], finalDate[1]-1, finalDate[2]);

      this.dataSource = new MatTableDataSource(this.tesouros);
      this.dataSource.paginator = this.paginator;
      this.graphicData = [];
      this.graphicTaxaRetorno = [];
      this.graphicRiscoData = [];
      this.graphicVaRData = [];
      this.tesouros.map((item: any) => {
        let newItem = {
          x: `${item['data_venda']['$date'].substring(8, 10)}/${item['data_venda']['$date'].substring(5, 7)}/${item['data_venda']['$date'].substring(0, 4)}`,
          y: item['PU'],
        };
        let TaxaRetorno = {
          x: `${item['data_venda']['$date'].substring(8, 10)}/${item['data_venda']['$date'].substring(5, 7)}/${item['data_venda']['$date'].substring(0, 4)}`,
          y: item['taxa_retorno_logaritmica'],
        };
        let risco = {
          x: `${item['data_venda']['$date'].substring(8, 10)}/${item['data_venda']['$date'].substring(5, 7)}/${item['data_venda']['$date'].substring(0, 4)}`,
          y: item['risco'],
        };
        let valueAtRisk = {
          x: `${item['data_venda']['$date'].substring(8, 10)}/${item['data_venda']['$date'].substring(5, 7)}/${item['data_venda']['$date'].substring(0, 4)}`,
          y: item['value_at_risk'],
        }
        this.graphicData.push(newItem);
        this.graphicTaxaRetorno.push(TaxaRetorno);
        this.graphicRiscoData.push(risco);
        this.graphicVaRData.push(valueAtRisk);
      });
      this.criaGrafico();
    });
  }

  getDataComparativo(tipo_titulo: string, ano_vencimento: string) {
    this.trasuryBoundService.listTreasuriesBound(tipo_titulo, ano_vencimento, this.initialDate.value, this.finalDate.value).then((res) => {
      this.tesourosComparativo = res;

      let initialDate = this.initialDate.value.split("-");
      initialDate = new Date(initialDate[0], initialDate[1]-1, initialDate[2]);

      let finalDate =  this.finalDate.value.split("-");
      finalDate = new Date(finalDate[0], finalDate[1]-1, finalDate[2]);

      this.graphicComparativoData = [];
      this.graphicTaxaRetornoComparativo = [];
      this.graphicRiscoDataComparativo = [];
      this.graphicVaRDataComparativo = [];

      this.tesourosComparativo.map((item: any) => {
        // let nova_data = new Date(item['data_venda']['$date'])
        let newItem = {
          x: `${item['data_venda']['$date'].substring(8, 10)}/${item['data_venda']['$date'].substring(5, 7)}/${item['data_venda']['$date'].substring(0, 4)}`,
          y: item['PU'],
        };
        let TaxaRetorno = {
          x: `${item['data_venda']['$date'].substring(8, 10)}/${item['data_venda']['$date'].substring(5, 7)}/${item['data_venda']['$date'].substring(0, 4)}`,
          y: item['taxa_retorno_logaritmica'],
        };
        let risco = {
          x: `${item['data_venda']['$date'].substring(8, 10)}/${item['data_venda']['$date'].substring(5, 7)}/${item['data_venda']['$date'].substring(0, 4)}`,
          y: item['risco'],
        };
        let valueAtRisk = {
          x: `${item['data_venda']['$date'].substring(8, 10)}/${item['data_venda']['$date'].substring(5, 7)}/${item['data_venda']['$date'].substring(0, 4)}`,
          y: item['value_at_risk'],
        }
        this.graphicComparativoData.push(newItem);
        this.graphicTaxaRetornoComparativo.push(TaxaRetorno);
        this.graphicRiscoDataComparativo.push(risco);
        this.graphicVaRDataComparativo.push(valueAtRisk);
      });
      this.getData(this.tipo.value, this.dataVencimento.value);
      this.pesquisou = true;
    });
  }

  getDataTaxa(tesouro: string, vencimento: string, comparativo?: boolean) {
    if(comparativo) {
      this.trasuryBoundService.listarTesourosTaxa(tesouro, vencimento, this.initialDate.value, this.finalDate.value).then((res) => {
        let dados = res;

        this.graphicTaxasComparativo = [];
        dados.map((item: any) => {
          // let nova_data = new Date(item['data_base']['$date'])
          let newItem = {
            x: `${item['data_base']['$date'].substring(8, 10)}/${item['data_base']['$date'].substring(5, 7)}/${item['data_base']['$date'].substring(0, 4)}`,
            y: item['taxa_compra_manha'],
          };
          this.graphicTaxasComparativo.push(newItem);
        });
      })
      this.trasuryBoundService.listarTesourosTaxa(this.tipo.value, this.dataVencimento.value, this.initialDate.value, this.finalDate.value).then((res) => {
        let dados = res;

        this.graphicTaxas = [];
        this.graphicTaxasLabels = [];
        dados.map((item: any) => {
          // let nova_data = new Date(item['data_base']['$date'])
          let newItem = {
            x: `${item['data_base']['$date'].substring(8, 10)}/${item['data_base']['$date'].substring(5, 7)}/${item['data_base']['$date'].substring(0, 4)}`,
            y: item['taxa_compra_manha'],
          };
          this.graphicTaxas.push(newItem);
        });

        this.criaGraficoTaxa();
        this.criaGraficoRetornoComparativo();
        this.criaGraficoRisco();
        this.criaGraficoVaR();
      })
    } else {
      this.trasuryBoundService.listarTesourosTaxa(tesouro, vencimento, this.initialDate.value, this.finalDate.value).then((res) => {
        let dados = res;

        this.graphicTaxas = [];
        this.graphicTaxasLabels = [];
        dados.map((item: any) => {
          // let nova_data = new Date(item['data_base']['$date'])
          let newItem = {
            x: `${item['data_base']['$date'].substring(8, 10)}/${item['data_base']['$date'].substring(5, 7)}/${item['data_base']['$date'].substring(0, 4)}`,
            y: item['taxa_compra_manha'],
          };
          this.graphicTaxas.push(newItem);
        });

        this.criaGraficoTaxa();
        this.criaGraficoTaxaRetorno();
        this.criaGraficoRisco();
        this.criaGraficoVaR();
      })
    }
  }

  getDataQuantidade(tesouro: string, vencimento: string, comparativo?: boolean) {
    if(comparativo) {
      this.trasuryBoundService.listTreasuriesBound(tesouro, vencimento, this.initialDate.value, this.finalDate.value).then((res) => {
        let dados = res;
        this.graficoQuantidadeComparativo = [];
        dados.map((item: any) => {
          // let nova_data = new Date(item['data_venda']['$date'])
          let newItem = {
            x: `${item['data_venda']['$date'].substring(8, 10)}/${item['data_venda']['$date'].substring(5, 7)}/${item['data_venda']['$date'].substring(0, 4)}`,
            y: item['quantidade'],
          };
          this.graficoQuantidadeComparativo.push(newItem);
        });
        this.trasuryBoundService.listTreasuriesBound(this.tipo.value, this.dataVencimento.value, this.initialDate.value, this.finalDate.value).then((res) => {
          let dados = res;
          this.graficoQuantidade = [];
          this.graficoQuantidadeLabels = [];
          dados.map((item: any) => {
            // let nova_data = new Date(item['data_venda']['$date'])
            let newItem = {
              x: `${item['data_venda']['$date'].substring(8, 10)}/${item['data_venda']['$date'].substring(5, 7)}/${item['data_venda']['$date'].substring(0, 4)}`,
              y: item['quantidade'],
            };
            this.graficoQuantidade.push(newItem);
          });
          this.criarGraficoQuantidade();
        });
      });
    } else {
      this.trasuryBoundService.listTreasuriesBound(tesouro, vencimento, this.initialDate.value, this.finalDate.value).then((res) => {
        let dados = res;

        this.graficoQuantidade = [];
        this.graficoQuantidadeLabels = [];
        dados.map((item: any) => {
          // let nova_data = new Date(item['data_venda']['$date'])
          let newItem = {
            x: `${item['data_venda']['$date'].substring(8, 10)}/${item['data_venda']['$date'].substring(5, 7)}/${item['data_venda']['$date'].substring(0, 4)}`,
            y: item['quantidade'],
          };
          this.graficoQuantidade.push(newItem);
        });
        this.criarGraficoQuantidade();
      });
    }
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
              backgroundColor: '#6200EE55 ',
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
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Preço Unitário',
            }
          },
        },
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
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Preço Unitário'
            }
          }
        },
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
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Valor da Taxa'
            }
          }
        },
      });
    } else {
      this.chart2 = new Chart('precoTaxa', {
        type : 'line',
        data: {
          datasets: [{
            label: `${this.tipo.value} ${this.dataVencimento.value}`,
            data: this.graphicTaxas,
            borderColor: '#6200EE55',
            fill: true,
            backgroundColor: '#6200EE55',
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Valor da Taxa'
            }
          }
        },
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
            borderColor: 'white',
            borderWidth: 2,
          }, {
            label: `${this.comparativo.value} ${this.dataComparativo.value}`,
            data: this.graficoQuantidadeComparativo,
            backgroundColor: "#b78af7",
            borderColor: 'white',
            borderWidth: 2,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Volume de Vendas'
            }
          }
        },
      });
    } else {
      this.chart3 = new Chart('quantidadeVendas', {
        type : 'bar',
        data: {
          datasets: [{
            label: `${this.tipo.value} ${this.dataVencimento.value}`,
            data: this.graficoQuantidade,
            backgroundColor: "#8133f1",
            borderColor: 'white',
            borderWidth: 2,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Volume de Vendas'
            }
          }
        },
      });
    }
  }

  submitForm(): void {
    if (!this.tesouroForm.invalid) {
      if(this.comparativo.value) {
        this.getDataComparativo(this.comparativo.value, this.dataComparativo.value)
        this.getDataTaxa(this.comparativo.value, this.dataComparativo.value, true)
        this.getDataQuantidade(this.comparativo.value, this.dataComparativo.value, true)
      } else {
        this.getData(this.tipo.value, this.dataVencimento.value);
        this.getDataTaxa(this.tipo.value, this.dataVencimento.value);
        this.getDataQuantidade(this.tipo.value, this.dataVencimento.value);
        this.pesquisou = true;
      }
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
    this.comparativo.setValue(undefined);
    this.dataComparativo.setValue(undefined);
  }

  criaGraficoTaxaRetorno() {
    this.graphicTaxaRetorno.shift();
    this.chart4 = new Chart('taxaRetorno', {
      type : 'line',
      data: {
        datasets: [
          {
            label: `${this.tipo.value} ${this.dataVencimento.value}`,
            data: this.graphicTaxaRetorno,
            borderColor: '#6200EE',
            backgroundColor: '#6200EE55 ',
            fill: true,
          },
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Taxa de Retorno Diário',
          }
        },
      },
    });
  }

  criaGraficoRetornoComparativo() {
    this.graphicTaxaRetorno.shift();
    this.graphicTaxaRetornoComparativo.shift();
    this.chart4 = new Chart('taxaRetorno', {
      type : 'line',
      data: {
        datasets: [
          {
            label: `${this.tipo.value} ${this.dataVencimento.value}`,
            data: this.graphicTaxaRetorno,
            borderColor: '#6200EE',
            backgroundColor: '#6200EE55 ',
            fill: true,
          },
          {
            label: `${this.comparativo.value} ${this.dataComparativo.value}`,
            data:  this.graphicTaxaRetornoComparativo,
            borderColor: '#933FFA',
            backgroundColor: '#933FFA55',
            fill: true,
          },
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Taxa de Retorno',
          }
        },
      },
    });
  }

  criaGraficoRisco() {
    if (!this.tesourosComparativo) {
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
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Risco do título',
            }
          },
        },
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
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Risco do título',
            }
          },
        },
      });
      }
  }

  criaGraficoVaR() {
    if (!this.tesourosComparativo) {
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
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Value at Risk',
            }
          },
        },
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
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Value at Risk',
            }
          },
        },
      });
      }
  }


  get initialDate() {
    return this.tesouroForm.get('initialDate') as FormControl;
  }

  get finalDate() {
    return this.tesouroForm.get('finalDate') as FormControl;
  }

  get tipo() {
    return this.tesouroForm.get('tipo') as FormControl;
  }

  get comparativo() {
    return this.tesouroForm.get('comparativo') as FormControl;
  }

  get dataVencimento() {
    return this.tesouroForm.get('dataVencimento') as FormControl;
  }

  get dataComparativo() {
    return this.tesouroForm.get('dataComparativo') as FormControl;
  }
}
