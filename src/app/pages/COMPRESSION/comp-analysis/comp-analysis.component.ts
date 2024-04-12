import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CompressionComponent } from '../../calculators/slenderness/compression.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { ElementsComponent } from '../../calculators/elements/elements.component';
import { ElasticBucklingComponent } from '../../calculators/elastic-buckling/elastic-buckling.component';
import { LeftsideComponent } from '../../../shared/components/leftside/leftside.component';

@Component({
  selector: 'app-comp-analysis',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, 
    NavbarComponent, LeftsideComponent,
    CompressionComponent, 
    CompressionbeamshapesComponent, 
    ElementsComponent, 
    ElasticBucklingComponent, 
  ],
  templateUrl: './comp-analysis.component.html',
  styleUrl: './comp-analysis.component.scss'
})
export class CompAnalysisComponent {

}
