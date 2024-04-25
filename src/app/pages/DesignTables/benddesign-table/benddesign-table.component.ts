import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


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
  onlyWbeams:boolean = true;

  constructor(private updater: BenddesignTableService) {
    this.updater.updateTable$.subscribe(() => {
      this.updater.loadTable();
      console.log("updater worked on designtablecomponent");
    });
  }
  
  onCheckboxChange() {
    this.onlyWbeams = !this.onlyWbeams;
    this.updater.onlyWbeams=this.onlyWbeams
    this.updater.loadTable();
  }

  ngOnInit() {
    this.updater.loadTable();
    // For each beam shape, calculate the status and add it to the beam shape ;
  };

  get beamShapes() {
    return this.updater.beamShapes$;
  }

  
}
  


