import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { CommonModule } from '@angular/common';
import { CompDesignRows } from './compdesign-table-properties.interface';
import { HttpClient } from '@angular/common/http';
import { CompDesignService } from '../../COMPRESSION/comp-design/comp-design.service';
import { CompdesignLoadsComponent } from '../../calculators/compdesign-loads/compdesign-loads.component';
import { CompdesignTableService } from './compdesign-table.service';

interface BeamShape {
  AISC_Manual_Label: string;
  Fy: number;
  A: number;
  rx: number;
  ry: number;
  'bf/2tf': number;
  'h/tw': number;
  PuLoad: number;
  PnLRFD: number;
  PaLoad: number;
  PnASD: number;
  Fcondition: string;
  Wcondition: string;
  LRFDstatus: string;
  ASDstatus: string;
}

@Component({
  selector: 'app-compdesign-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compdesign-table.component.html',
  styleUrl: './compdesign-table.component.scss'
})
export class CompdesignTableComponent implements OnInit {
  beamShapes$ = this.updater.beamShapes$;
  onlyWbeams:boolean = true;

  constructor(private updater: CompdesignTableService) {
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
  


