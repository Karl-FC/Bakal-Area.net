import { Component, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imports: [CommonModule, ReactiveFormsModule, ErrorAlertComponent],
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
  
  get maxKL() {
    return this.SharedElements.maxKL.value;
    
  }
  
  set maxKL(value: number) {
    this.SharedElements.maxKL.next(value);
  }
  
  addRow() {
    console.log("addRow kinda works");
    console.log("Max kL is " + this.SharedElements.maxKL.value)
    
    
  
  
  
  
    //Calculating kL/r
    let elemLength = Number(this.elemLength.value);
    let KFactor = Number(this.KFactor.value)
    let kL = Number(((elemLength * KFactor)).toFixed(6));
        console.log("Inputed length is " + elemLength);
        console.log("Slected K is " + KFactor);
        console.log("kL is " + kL);
  
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
  
  
  
  
  //ERROR MESSAGES
        //No Length
        if (!DL || !LL || !E || !Fy) {
          const elemError = document.getElementById('elemError');
          console.log("Inputs not complete");
          this.errAlert.errorAlert('no input');
          return;
          };
          
        if (!elemLength || !KFactor || !kL) {
            const elemError = document.getElementById('elemError');
            console.log("Inputs not complete");
            this.errAlert.errorAlert('no input');
            return;
            };
  
  
  
  
  
  
      // Update maxKL if current kL is greater
      if (kL > this.maxKL) {
        this.maxKL = kL;
        console.log("Max kL updated to " + this.SharedElements.maxKL.value)
            }
  
    }
  
  
   

  
  
  
  
  onRowSelect(index: number) {
    // Add shared variables as needed...
          let DL = Number(this.DL.value);
              this.SharedElements.DL.next(DL);
          let LL = Number(this.LL.value);
              this.SharedElements.LL.next(LL);
          let E = Number(this.E.value);
              this.SharedElements.E.next(E);
          let Fy = Number(this.Fy.value);
              this.SharedElements.Fy.next(Fy);
  
  
    console.log('Chosen KL is', this.SharedElements.chosenKFactor.value);
    this.refreshTable();
    console.log("sending update");
  }
  
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