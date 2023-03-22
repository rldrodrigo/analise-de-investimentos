import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tesouro',
  templateUrl: './tesouro.component.html',
  styleUrls: ['./tesouro.component.scss']
})
export class TesouroComponent implements OnInit {

  tesouro: any;
  graphicTaxaRetorno: any;
  chart4: any = [];

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.tesouro = data.tesouro;
    this.graphicTaxaRetorno = data.graphicTaxaRetorno;
    this.graphicTaxaRetorno.shift();

    // let dataNova = this.tesouro['Data Venda'].split("/")
    // let newData = new Date(dataNova[2], dataNova[1]-1, dataNova[0])
   }

  ngOnInit(): void {
    this.criaGrafico()
  }

  criaGrafico() {
    this.chart4 = new Chart('taxaRetorno', {
      type : 'line',
      data: {
        datasets: [
          {
            label: `${this.tesouro['tipo_titulo']} ${this.tesouro['ano_vencimento']}`,
            data: this.graphicTaxaRetorno,
            borderColor: '#FF336B',
            fill: false,
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
}
