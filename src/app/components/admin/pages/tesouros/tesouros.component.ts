import { Component, OnInit } from '@angular/core';
import { TreasuryboundService } from 'src/app/services/treasurybound.service';

@Component({
  selector: 'app-tesouros',
  templateUrl: './tesouros.component.html',
  styleUrls: ['./tesouros.component.scss']
})
export class TesourosComponent implements OnInit {

  tesouros: any;

  constructor(
    private trasuryBoundService: TreasuryboundService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.tesouros = this.trasuryBoundService.listTreasuriesBound();
    console.log(this.tesouros.response);
  }

}
