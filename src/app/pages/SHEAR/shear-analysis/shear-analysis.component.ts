import { Component, OnInit } from '@angular/core';
import { SharedVariable } from '../../../shared.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CompressionComponent } from '../../calculators/slenderness/compression.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { FlexresultsComponent } from '../../calculators/flexresults/flexresults.component';
import { SymmetricalBendingComponent } from '../../calculators/symmetrical-bending/symmetrical-bending.component';
import { CvComponent } from '../../calculators/cv/cv.component';
import { MaxmomentsComponent } from '../../calculators/maxmoments/maxmoments.component';

@Component({
  selector: 'app-shear-analysis',
  standalone: true,
  imports: [MaxmomentsComponent, CompressionbeamshapesComponent, CvComponent],
  templateUrl: './shear-analysis.component.html',
  styleUrl: './shear-analysis.component.scss'
})
export class ShearAnalysisComponent implements OnInit {  


  constructor(private sharedService: SharedVariable) {
  }

  ngOnInit() {
    this.sharedService.mainTitle = 'Shear Analysis Calculator';
    this.sharedService.subTitle = 'Slenderness Check';
  }
}
