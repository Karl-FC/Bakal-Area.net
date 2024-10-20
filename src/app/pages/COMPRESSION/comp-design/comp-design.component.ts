import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CompressionComponent } from '../../calculators/slenderness/compression.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { ElementsComponent } from '../../calculators/elements/elements.component';
import { ElasticBucklingComponent } from '../../calculators/elastic-buckling/elastic-buckling.component';
import { LeftsideComponent } from '../../../shared/components/leftside/leftside.component';
import { CompdesignTableComponent } from '../../DesignTables/compdesign-table/compdesign-table.component';
import { CompdesignLoadsComponent } from '../../calculators/compdesign-loads/compdesign-loads.component';
import { CompdesignTableService } from '../../DesignTables/compdesign-table/compdesign-table.service';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { SharedVariable } from '../../../shared.service';

@Component({
  selector: 'app-comp-design',
  standalone: true,
  providers: [TitleComponent],
  imports: [RouterOutlet, FormsModule, CommonModule, 
    NavbarComponent, LeftsideComponent,
    CompressionComponent, 
    CompressionbeamshapesComponent, 
    ElementsComponent, 
    ElasticBucklingComponent, 
    CompdesignTableComponent,
    CompdesignLoadsComponent, TitleComponent
  ],
  templateUrl: './comp-design.component.html',
  styleUrl: './comp-design.component.scss'
})
export class CompDesignComponent implements OnInit {  


  constructor(private sharedService: SharedVariable) {
  }

  ngOnInit() {
    this.sharedService.mainTitle = 'Design Calculator for Axial Compression';
    this.sharedService.instructions = 'Input all the required variables in order, then use the Table of Elements to assign elements and their properties.';
      this.sharedService.extrainstructions = 'Afterwhich, select the governing element then press "Refresh Table';
  }
}