import { Component, OnInit } from '@angular/core';
import { SharedVariable } from '../../../shared.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CompressionComponent } from '../../calculators/slenderness/compression.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { ElementsComponent } from '../../calculators/elements/elements.component';
import { ElasticBucklingComponent } from '../../calculators/elastic-buckling/elastic-buckling.component';
import { LeftsideComponent } from '../../../shared/components/leftside/leftside.component';

import { FlexresultsComponent } from '../../calculators/flexresults/flexresults.component';
import { SymmetricalBendingComponent } from '../../calculators/symmetrical-bending/symmetrical-bending.component';

@Component({
  selector: 'app-bend-analysis',
  standalone: true,
  imports: [FlexresultsComponent, CompressionbeamshapesComponent, SymmetricalBendingComponent],
  templateUrl: './bend-analysis.component.html',
  styleUrl: './bend-analysis.component.scss'
})
export class BendAnalysisComponent implements OnInit {  


    constructor(private sharedService: SharedVariable) {
    }
  
    ngOnInit() {
      this.sharedService.mainTitle = 'Analysis Calculator for Bending';
      this.sharedService.subTitle = 'Slenderness Check';
      this.sharedService.instructions = `Instructions: Input all the required variables in order and then click "Determine" to see if the chosen Wsection is compact, non-compact or slender.`;
    this.sharedService.extrainstructions = `Note: For every new Wsection chosen and after inputting the required values for Fy and E, remember to click the "Determine" first to update the results below.`
    }
}
