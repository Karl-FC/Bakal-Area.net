import { Component, OnInit } from '@angular/core';
import { SharedVariable } from '../../../shared.service';

@Component({
  selector: 'app-ten-design',
  standalone: true,
  imports: [],
  templateUrl: './ten-design.component.html',
  styleUrl: './ten-design.component.scss'
})
export class TenDesignComponent implements OnInit {  


  constructor(private sharedService: SharedVariable) {
  }

  ngOnInit() {
    this.sharedService.mainTitle = 'Design Calculator for Axial Tension';
  } 
}
