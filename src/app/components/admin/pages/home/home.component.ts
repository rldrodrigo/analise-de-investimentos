import { HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { TreasuryboundService } from 'src/app/services/treasurybound.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tesouros: any;

  constructor(
    private trasuryBoundService: TreasuryboundService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.tesouros = this.trasuryBoundService.listTreasuriesBound();
    console.log(this.tesouros);
  }
}
