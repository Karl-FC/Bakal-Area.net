import { Component, OnInit } from '@angular/core';
import { SharedVariable } from '../../../shared.service';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { LeftsideComponent } from '../../../shared/components/leftside/leftside.component';
import { BenddesignTableComponent } from '../../DesignTables/benddesign-table/benddesign-table.component';
import { BenddesignLoadsComponent } from '../../calculators/benddesign-loads/benddesign-loads.component';

import { SheardesignTableComponent } from '../../DesignTables/sheardesign-table/sheardesign-table.component';
import { ShearDesignService } from './shear-design.service';

@Component({
  selector: 'app-shear-design',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, 
    NavbarComponent, LeftsideComponent,
    SheardesignTableComponent, BenddesignLoadsComponent
  ],
  templateUrl: './shear-design.component.html',
  styleUrl: './shear-design.component.scss'
})
export class ShearDesignComponent implements OnInit {  


  constructor(private sharedService: SharedVariable) {
  }

  ngOnInit() {
    this.sharedService.mainTitle = 'Shear Design Calculator';
  }
}