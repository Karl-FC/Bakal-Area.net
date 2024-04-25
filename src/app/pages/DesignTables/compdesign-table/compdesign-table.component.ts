import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CompDesignService } from '../../COMPRESSION/comp-design/comp-design.service';
import { CompdesignLoadsComponent } from '../../calculators/compdesign-loads/compdesign-loads.component';
import { CompdesignTableService, BeamShape } from './compdesign-table.service';


@Component({
  selector: 'app-compdesign-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compdesign-table.component.html',
  styleUrl: './compdesign-table.component.scss'
})
export class CompdesignTableComponent implements OnInit {
  beamShapes$ = this.updater.beamShapes$;
  beamFilters = new FormControl('');

  constructor(private updater: CompdesignTableService) {
    this.updater.updateTable$.subscribe(() => {
      this.updater.loadTable();
      console.log("updater worked on designtablecomponent");
    });
  }

  onFilterChange() {
    let beamFilters = Number(this.beamFilters.value);
    this.updater.beamFilter.next(beamFilters);
    if (this.beamFilters.value !== null) {
        this.updater.setBeamFilter(Number(this.beamFilters.value));
    }
    // or assign a default value if this.beamFilters.value is null
    else {
        this.updater.setBeamFilter(0); // replace 0 with your default value
    }
}

  ngOnInit() {
    this.updater.loadTable();
    // For each beam shape, calculate the status and add it to the beam shape ;
  };

  get beamShapes() {
    return this.updater.beamShapes$;
  }
}
  


