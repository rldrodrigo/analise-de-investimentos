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
  TiposDeTitulos: any = [
    {
      indice: 1,
      value: "Tesouro IGPM+ com Juros Semestrais"
    },
    {
      indice: 2,
      value: "Tesouro Selic",
    },
    {
      indice: 3,
      value: "Tesouro IPCA+",
    },
    {
      indice: 4,
      value: "Tesouro IPCA+ com Juros Semestrais",
    },
    {
      indice: 5,
      value: "Tesouro Prefixado com Juros Semestrais",
    },
    {
      indice: 6,
      value: "Tesouro Prefixado",
    },
  ];
  selecionou: boolean = false;
  selecionouComparativo: boolean = false;

  listaDataVencimento: any  = [];
  listaDataVencimentoComparativo: any = [];

  graphicLabels: any = [];

  graphicData: any = [];
  graphicComparativoData: any = [];

  graphicTaxasLabels: any = [];
  graphicTaxas: any = [];
  graphicTaxasComparativo: any = [];

  tesouros: any = [];
  tesourosComparativo: any = [];
  pesquisou: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("meuCanvas", { static: true }) elemento!: ElementRef;

  chart: any = [];
  chart2: any = [];
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

  getData(tesouro: string, name: string) {
    this.trasuryBoundService.listTreasuriesBound(tesouro, name).then((res) => {
      this.tesouros = res;

      let initialDate = this.initialDate.value.split("-");
      initialDate = new Date(initialDate[0], initialDate[1]-1, initialDate[2]);

      let finalDate =  this.finalDate.value.split("-");
      finalDate = new Date(finalDate[0], finalDate[1]-1, finalDate[2]);
      this.tesouros.map((item : any) => {
        item['Data Venda'] = this.converteData(item['Data Venda']);
      })
      this.tesouros = this.tesouros.filter((item: any) => item['Data Venda'] > initialDate && item['Data Venda'] < finalDate);
      this.tesouros.sort(function (a: any, b: any) {
        if(a['Data Venda'] > b['Data Venda']) {
          return 1
        }
        if(a['Data Venda'] < b['Data Venda']) {
          return -1
        }
        return 0
      });
      this.dataSource = new MatTableDataSource(this.tesouros);
      this.dataSource.paginator = this.paginator;
      this.graphicData = [];
      this.graphicLabels = [];
      this.tesouros.map((item: any) => {
        this.graphicData.push(item['PU']);
        this.graphicLabels.push(`${item['Data Venda'].getDate()}/${item['Data Venda'].getMonth()+1}/${item['Data Venda'].getFullYear()}`);
      });
      this.criaGrafico();
    });
  }

  getDataComparativo(tesouro: string, name: string) {
    this.trasuryBoundService.listTreasuriesBound(tesouro, name).then((res) => {
      this.tesourosComparativo = res;

      let initialDate = this.initialDate.value.split("-");
      initialDate = new Date(initialDate[0], initialDate[1]-1, initialDate[2]);

      let finalDate =  this.finalDate.value.split("-");
      finalDate = new Date(finalDate[0], finalDate[1]-1, finalDate[2]);
      this.tesourosComparativo.map((item : any) => {
        item['Data Venda'] = this.converteData(item['Data Venda']);
      })
      this.tesourosComparativo = this.tesourosComparativo.filter((item: any) => item['Data Venda'] > initialDate && item['Data Venda'] < finalDate);
      // Função reponsável por ordenar as datas
      this.tesourosComparativo.sort(function (a: any, b: any) {
        if(a['Data Venda'] > b['Data Venda']) {
          return 1
        }
        if(a['Data Venda'] < b['Data Venda']) {
          return -1
        }
        return 0
      })
      this.graphicComparativoData = [];
      this.tesourosComparativo.map((item: any) => {
        this.graphicComparativoData.push(item['PU']);
      });
      this.getData(this.tipo.value.indice, this.dataVencimento.value);
      this.pesquisou = true;
    });
  }

  getDataTaxa(tesouro: string, vencimento: string, comparativo?: boolean) {
    this.trasuryBoundService.listarTesourosTaxa(tesouro, vencimento).then((res) => {
      let dados = res;

      let initialDate = this.initialDate.value.split("-");
      initialDate = new Date(initialDate[0], initialDate[1]-1, initialDate[2]);

      let finalDate =  this.finalDate.value.split("-");
      finalDate = new Date(finalDate[0], finalDate[1]-1, finalDate[2]);

      dados.map((item : any) => {
        item['Data Base'] = this.converteData(item['Data Base']);
      })

      dados = dados.filter((item: any) => item['Data Base'] > initialDate && item['Data Base'] < finalDate);
      // Função reponsável por ordenar as datas
      dados.sort(function (a: any, b: any) {
        if(a['Data Base'] > b['Data Base']) {
          return 1
        }
        if(a['Data Base'] < b['Data Base']) {
          return -1
        }
        return 0
      })

      this.graphicTaxas = [];
      this.graphicTaxasLabels = [];
      dados.map((item: any) => {
        this.graphicTaxas.push(item['PU Base Manha']);
        this.graphicTaxasLabels.push(`${item['Data Base'].getDate()}/${item['Data Base'].getMonth()+1}/${item['Data Base'].getFullYear()}`);
      });

      this.criaGraficoTaxa();
      console.log(this.graphicTaxas);
      console.log(this.graphicTaxasLabels)
    })
  }


  converteData(data: any) {
    let dataNova = data.split("/")
    let newData = new Date(dataNova[2], dataNova[1]-1, dataNova[0]);
    return newData;
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
          labels: this.graphicLabels,
          datasets: [{
            label: this.tipo.value.value.concat(' ').concat(this.dataVencimento.value.slice(this.dataVencimento.value.length - 4)),
            data: this.graphicData,
            borderColor: '#FF336B',
            fill: false,
          },
          {
            label: this.comparativo.value.value.concat(' ').concat(this.dataComparativo.value.slice(this.dataComparativo.value.length - 4)),
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
          labels: this.graphicLabels,
          datasets: [{
            label: "Gráfico de preço unitário ".concat(this.tipo.value.value.concat(' ').concat(this.dataVencimento.value.slice(this.dataVencimento.value.length - 4))),
            data: this.graphicData,
            borderColor: '',
            fill: false,
          }]
        }
      });
    }
  }

  criaGraficoTaxa(){
    this.chart2 = new Chart('precoTaxa', {
      type : 'line',
      data: {
        labels: this.graphicTaxasLabels,
        datasets: [{
          label: "Gráfico de taxa ".concat(this.tipo.value.value.concat(' ').concat(this.dataVencimento.value.slice(this.dataVencimento.value.length - 4))),
          data: this.graphicTaxas,
          borderColor: '#33D1FF',
          fill: false,
        }]
      }
    });
  }

  submitForm(): void {
    if (!this.tesouroForm.invalid) {
      if(this.comparativo.value) {
        this.getDataComparativo(this.comparativo.value.indice, this.dataComparativo.value)
        this.getDataTaxa(this.comparativo.value.indice, this.dataComparativo.value, true)
      } else {
        this.getData(this.tipo.value.indice, this.dataVencimento.value);
        this.getDataTaxa(this.tipo.value.indice, this.dataVencimento.value)
        this.pesquisou = true;
      }
    }
  }

  selecionaPapel(titulo: any){
    this.listaDataVencimento = [];
    this.trasuryBoundService.listaTesourosPeloNome(titulo.indice.toString()).then(res => {
      this.selecionou = true;
      let listaVencimento:any = []
      res.map((item: any) => listaVencimento.push(item['Vencimento do Titulo']))
      var unique = new Set(listaVencimento)
      this.listaDataVencimento = unique;
    })
  }

  selecionaPapelComparativo(titulo: any){
    this.listaDataVencimentoComparativo = [];
    this.trasuryBoundService.listaTesourosPeloNome(titulo.indice.toString()).then(res => {
      this.selecionouComparativo = true;
      let listaVencimento:any = []
      res.map((item: any) => listaVencimento.push(item['Vencimento do Titulo']))
      var unique = new Set(listaVencimento)
      this.listaDataVencimentoComparativo = unique;
    })
  }

  novaConsulta() {
    this.pesquisou = false;
    this.comparativo.setValue("");
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
