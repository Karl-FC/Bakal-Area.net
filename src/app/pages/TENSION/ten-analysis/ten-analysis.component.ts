import { Component, OnInit } from '@angular/core';
import { SharedVariable } from '../../../shared.service';
import { StaggeredComponent } from '../../calculators/staggered/staggered.component';
import { TensionbeamshapesComponent } from '../../../shared/data/tensionbeamshapes/tensionbeamshapes.component';
import { NetareaComponent } from '../../../netarea/netarea.component';

@Component({
  selector: 'app-ten-analysis',
  standalone: true,
  imports: [StaggeredComponent, NetareaComponent, TensionbeamshapesComponent],
  templateUrl: './ten-analysis.component.html',
  styleUrl: './ten-analysis.component.scss'
})
export class TenAnalysisComponent implements OnInit {  


  constructor(private sharedService: SharedVariable) {
  }

  ngOnInit() {
    this.sharedService.mainTitle = 'Analysis Calculator for Axial Tension';
    this.sharedService.subTitle = 'Select Tension Member:'
  }

}
