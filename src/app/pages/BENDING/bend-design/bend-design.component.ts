import { Component, OnInit } from '@angular/core';
import { SharedVariable } from '../../../shared.service';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { LeftsideComponent } from '../../../shared/components/leftside/leftside.component';
import { BenddesignTableComponent } from '../../DesignTables/benddesign-table/benddesign-table.component';
import { BenddesignLoadsComponent } from '../../calculators/benddesign-loads/benddesign-loads.component';


@Component({
  selector: 'app-bend-design',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, 
    NavbarComponent, LeftsideComponent,
    BenddesignTableComponent, BenddesignLoadsComponent
  ],
  templateUrl: './bend-design.component.html',
  styleUrl: './bend-design.component.scss'
})
export class BendDesignComponent implements OnInit {  


  constructor(private sharedService: SharedVariable) {
  }

  ngOnInit() {
    this.sharedService.mainTitle = 'Design Calculator for Bending';
    this.sharedService.instructions = 'Input all the required variables in order and then click "Refresh Table';
      this.sharedService.extrainstructions = '';
  }
}