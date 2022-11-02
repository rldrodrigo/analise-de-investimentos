import { Component, OnInit, ElementRef } from '@angular/core';
import { TreasuryboundService } from 'src/app/services/treasurybound.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TesouroComponent } from './tesouro/tesouro.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';


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

  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  tesouros: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("meuCanvas", { static: true }) elemento!: ElementRef;

  constructor(
    private trasuryBoundService: TreasuryboundService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  getData(tesouro: string) {
    console.log(tesouro)
    this.trasuryBoundService.listTreasuriesBound(tesouro).then((res) => {
      this.tesouros = res;
      this.dataSource = new MatTableDataSource(this.tesouros);
      this.dataSource.paginator = this.paginator;
    });
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
}
