import { Component, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedVariable } from '../../../shared.service';
import { ErrorAlertComponent } from '../../../shared/components/error-alert/error-alert.component';
import { ErrorAlertService } from '../../../shared/components/error-alert/error-alert.service';

import { BenddesignTableComponent } from '../../DesignTables/benddesign-table/benddesign-table.component';
import { BenddesignTableService } from '../../DesignTables/benddesign-table/benddesign-table.service';
import { BendDesignService } from '../../BENDING/bend-design/bend-design.service';

@Component({
  selector: 'app-benddesign-loads',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorAlertComponent,FormsModule],
  templateUrl: './benddesign-loads.component.html',
  styleUrl: './benddesign-loads.component.scss'
})
export class BenddesignLoadsComponent {
  constructor( private sharedService: SharedVariable, 
    public SharedElements: BendDesignService,
    private updater: BenddesignTableService,
    private errAlert: ErrorAlertService) {}

    LargestKL: { 
      element: string, 
      elemLength: number, 
      KFactor: number, 
      kL: number, 
      DL: number, 
      LL: number,
      E: number, 
      Fy: number, }[] = []; //Make array
        
      element = new FormControl('');
      elemLength = new FormControl('', Validators.pattern("^[0-9]*\.?[0-9]*$"));
      KFactor = new FormControl('', Validators.pattern("^[0-9]*\.?[0-9]*$"));
      beamCase = new FormControl('');
      LL = new FormControl('', Validators.pattern("^[0-9]*\.?[0-9]*$"));
      DL = new FormControl('', Validators.pattern("^[0-9]*\.?[0-9]*$"));
      
      E = new FormControl('');
      Fy = new FormControl('');
  
  selectedRowIndex: number = 0;
  bf2tf = new FormControl('');
  htw = new FormControl('');
  
  F_Lamda = new FormControl('');
  W_Lamda = new FormControl('');
  


  
  refreshTable() {
    this.updater.loadTable();

    let DL = Number(this.DL.value);
        this.SharedElements.DL.next(DL);
    let LL = Number(this.LL.value);
        this.SharedElements.LL.next(LL);
    let E = Number(this.E.value);
        this.SharedElements.E.next(E);
    let beamCase = Number(this.beamCase.value);
        this.SharedElements.beamCase.next(beamCase);
    let Fy = Number(this.Fy.value);
        this.SharedElements.Fy.next(Fy);
    let L = Number(this.elemLength.value);
        this.SharedElements.chosenElemLength.next(L);

  }
  
  
  }