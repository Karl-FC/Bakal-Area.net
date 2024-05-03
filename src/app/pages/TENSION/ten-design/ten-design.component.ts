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
import { TensionInputsComponent } from '../../calculators/tension-inputs/tension-inputs.component';
import { TendesignTableComponent } from '../../DesignTables/tendesign-table/tendesign-table.component';

@Component({
  selector: 'app-ten-design',
  standalone: true,
  imports: [TenDesignComponent,TensionInputsComponent, TendesignTableComponent],
  templateUrl: './ten-design.component.html',
  styleUrl: './ten-design.component.scss'
})
export class TenDesignComponent implements OnInit {  


  constructor(private sharedService: SharedVariable) {
  }

  ngOnInit() {
    this.sharedService.mainTitle = 'Design Calculator for Axial Tension';
    this.sharedService.instructions = 'Input all the required variables in order and then click "Refresh Table';
      this.sharedService.extrainstructions = '';
      this.sharedService.showExtras = true;
  } 
}
