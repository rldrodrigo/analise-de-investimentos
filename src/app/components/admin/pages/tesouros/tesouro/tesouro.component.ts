import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tesouro',
  templateUrl: './tesouro.component.html',
  styleUrls: ['./tesouro.component.scss']
})
export class TesouroComponent implements OnInit {

  tesouro: any;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.tesouro = data.tesouro;

    let dataNova = this.tesouro['Data Venda'].split("/")
    let newData = new Date(dataNova[2], dataNova[1]-1, dataNova[0])
    console.log(dataNova, newData);
   }

  ngOnInit(): void {
    console.log(this.tesouro)
  }

}
