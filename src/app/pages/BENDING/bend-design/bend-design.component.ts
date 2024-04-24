import { Component } from '@angular/core';
import { CompdesignLoadsComponent } from '../../calculators/compdesign-loads/compdesign-loads.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { LeftsideComponent } from '../../../shared/components/leftside/leftside.component';
import { CompressionComponent } from '../../calculators/slenderness/compression.component';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { ElementsComponent } from '../../calculators/elements/elements.component';
import { ElasticBucklingComponent } from '../../calculators/elastic-buckling/elastic-buckling.component';
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
export class BendDesignComponent {

}
