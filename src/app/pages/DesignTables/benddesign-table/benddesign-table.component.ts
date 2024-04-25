import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


import { BenddesignTableService, BeamShape} from './benddesign-table.service';

@Component({
  selector: 'app-Benddesign-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './benddesign-table.component.html',
  styleUrl: './benddesign-table.component.scss'
})


export class BenddesignTableComponent implements OnInit {
  beamShapes$ = this.updater.beamShapes$;
  beamFilters = new FormControl('');

  constructor(private updater: BenddesignTableService) {
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
  


