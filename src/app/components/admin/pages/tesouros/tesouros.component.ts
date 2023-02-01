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

  tesouros: any = [];
  tesourosComparativo: any = [];
  pesquisou: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("meuCanvas", { static: true }) elemento!: ElementRef;

  chart: any = [];
  chart2: any = [];
  chart3: any = [];
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
      this.graphicLabels = [];
      this.tesouros.map((item: any) => {
        let nova_data = new Date(item['data_venda']['$date'])
        let newItem = {
          x: `${nova_data.getDate() + 1}/${nova_data.getMonth() + 1}/${nova_data.getFullYear()}`,
          y: item['PU'],
        };
        this.graphicData.push(newItem);
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
      this.tesourosComparativo.map((item: any) => {
        let nova_data = new Date(item['data_venda']['$date'])
        let newItem = {
          x: `${nova_data.getDate() + 1}/${nova_data.getMonth() + 1}/${nova_data.getFullYear()}`,
          y: item['PU'],
        };
        this.graphicComparativoData.push(newItem);
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
          let nova_data = new Date(item['data_base']['$date'])
          let newItem = {
            x: `${nova_data.getDate() + 1}/${nova_data.getMonth() + 1}/${nova_data.getFullYear()}`,
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
          let nova_data = new Date(item['data_base']['$date'])
          let newItem = {
            x: `${nova_data.getDate() + 1}/${nova_data.getMonth() + 1}/${nova_data.getFullYear()}`,
            y: item['taxa_compra_manha'],
          };
          this.graphicTaxas.push(newItem);
        });

        this.criaGraficoTaxa();
      })
    } else {
      this.trasuryBoundService.listarTesourosTaxa(tesouro, vencimento, this.initialDate.value, this.finalDate.value).then((res) => {
        let dados = res;

        this.graphicTaxas = [];
        this.graphicTaxasLabels = [];
        dados.map((item: any) => {
          let nova_data = new Date(item['data_base']['$date'])
          let newItem = {
            x: `${nova_data.getDate() + 1}/${nova_data.getMonth() + 1}/${nova_data.getFullYear()}`,
            y: item['taxa_compra_manha'],
          };
          this.graphicTaxas.push(newItem);
        });

        this.criaGraficoTaxa();
      })
    }
  }

  getDataQuantidade(tesouro: string, vencimento: string, comparativo?: boolean) {
    if(comparativo) {
      this.trasuryBoundService.listTreasuriesBound(tesouro, vencimento, this.initialDate.value, this.finalDate.value).then((res) => {
        let dados = res;
        this.graficoQuantidadeComparativo = [];
        dados.map((item: any) => {
          let nova_data = new Date(item['data_venda']['$date'])
          let newItem = {
            x: `${nova_data.getDate() + 1}/${nova_data.getMonth() + 1}/${nova_data.getFullYear()}`,
            y: item['quantidade'],
          };
          this.graficoQuantidadeComparativo.push(newItem);
        });
        this.trasuryBoundService.listTreasuriesBound(this.tipo.value, this.dataVencimento.value, this.initialDate.value, this.finalDate.value).then((res) => {
          let dados = res;
          this.graficoQuantidade = [];
          this.graficoQuantidadeLabels = [];
          dados.map((item: any) => {
            let nova_data = new Date(item['data_venda']['$date'])
            let newItem = {
              x: `${nova_data.getDate() + 1}/${nova_data.getMonth() + 1}/${nova_data.getFullYear()}`,
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
          let nova_data = new Date(item['data_venda']['$date'])
          let newItem = {
            x: `${nova_data.getDate() + 1}/${nova_data.getMonth() + 1}/${nova_data.getFullYear()}`,
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
          datasets: [{
            label: "Gráfico de preço unitário ".concat(this.tipo.value.concat(' ').concat(this.dataVencimento.value)),
            data: this.graphicData,
            borderColor: '#FF336B',
            fill: false,
          },
          {
            label: "Gráfico de preço unitário ".concat(this.comparativo.value.concat(' ').concat(this.dataComparativo.value)),
            data: this.graphicComparativoData,
            borderColor: 'blue',
            fill: false,
          }
        ]
        }
      });

    } else {
      this.chart = new Chart('canvas', {
        type : 'line',
        data: {
          datasets: [{
            label: "Gráfico de preço unitário ".concat(this.tipo.value.concat(' ').concat(this.dataVencimento.value)),
            data: this.graphicData,
            borderColor: '#FF336B',
            fill: false,
          }]
        }
      });
    }
  }

  criaGraficoTaxa(){
    if(this.comparativo.value) {
      console.log(this.graphicTaxasComparativo);
      console.log(this.graphicTaxas);
      this.chart2 = new Chart('precoTaxa', {
        type : 'line',
        data: {
          datasets: [{
            label: "Gráfico de taxa ".concat(this.tipo.value.concat(' ').concat(this.dataVencimento.value)),
            data: this.graphicTaxas,
            borderColor: '#33D1FF',
            fill: false,
          }, {
            label: "Gráfico de taxa ".concat(this.comparativo.value.concat(' ').concat(this.dataComparativo.value)),
            data: this.graphicTaxasComparativo,
            borderColor: '#D1F',
            fill: false,
          }]
        }
      });
    } else {
      this.chart2 = new Chart('precoTaxa', {
        type : 'line',
        data: {
          datasets: [{
            label: "Gráfico de taxa ".concat(this.tipo.value.concat(' ').concat(this.dataVencimento.value)),
            data: this.graphicTaxas,
            borderColor: '#33D1FF',
            fill: false,
          }]
        }
      });
    }
  }

  criarGraficoQuantidade(){
    if(this.comparativo.value) {
      this.chart3 = new Chart('quantidadeVendas', {
        type : 'bar',
        data: {
          datasets: [{
            label: "Gráfico de quantidade de vendas ".concat(this.tipo.value.concat(' ').concat(this.dataVencimento.value)),
            data: this.graficoQuantidade,
            backgroundColor: "#8c6bef"
          }, {
            label: "Gráfico de quantidade de vendas ".concat(this.comparativo.value.concat(' ').concat(this.dataComparativo.value)),
            data: this.graficoQuantidadeComparativo,
            backgroundColor: "#f00a5e"
          }]
        }
      });
    } else {
      this.chart3 = new Chart('quantidadeVendas', {
        type : 'bar',
        data: {
          datasets: [{
            label: "Gráfico de quantidade de vendas ".concat(this.tipo.value.concat(' ').concat(this.dataVencimento.value)),
            data: this.graficoQuantidade,
            backgroundColor: "#8c6bef"
          }]
        }
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
