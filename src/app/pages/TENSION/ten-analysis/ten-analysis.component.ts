import { Component, OnInit } from '@angular/core';
import { SharedVariable } from '../../../shared.service';

@Component({
  selector: 'app-ten-analysis',
  standalone: true,
  imports: [],
  templateUrl: './ten-analysis.component.html',
  styleUrl: './ten-analysis.component.scss'
})
export class TenAnalysisComponent implements OnInit {  


  constructor(private sharedService: SharedVariable) {
  }

  ngOnInit() {
    this.sharedService.mainTitle = 'Analysis Calculator for Axial Tension';
  }

}
