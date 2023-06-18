import { Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
import { Chart, ChartTypeRegistry } from 'chart.js';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit, AfterViewInit  {
  @Input() pesquisou: boolean = false;
  @Input() type: any;
  @Input() name: string = 'canvas';
  @Input() label: string = '';
  @Input() borderColor: string = '';
  @Input() backgroundColor: string = '';
  @Input() fill: boolean = true;
  @Input() responsive: boolean = true;
  @Input() text: string = '';
  @Input() data: any;

  teste = {
    name: this.name
  }

  chart: any = [];
  @ViewChild('canvas') canvas?: ElementRef;

  constructor() { }

  ngOnChange() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.chart = new Chart(this.canvas?.nativeElement.getContext('2d'), {
      type : this.type,
      data: {
        datasets: [{
          label: this.label,
          data: this.data,
          borderColor: this.borderColor,
          fill: this.fill,
          backgroundColor: this.backgroundColor,
        }]
      },
      options: {
        responsive: this.responsive,
        plugins: {
          legend: {
            position: 'top',
            labels : {
              font: {
                size: 24
              }
            }
          },
          title: {
            display: true,
            text: this.text,
          }
        }
      },
    });
}

}
