import { Component, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { CompressionComponent } from '../slenderness/compression.component';
import { CommonModule } from '@angular/common';
import { beamShape } from '../../../shared.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CompDesignService } from '../../COMPRESSION/comp-design/comp-design.service';
import { CompdesignTableService } from '../../DesignTables/compdesign-table.service';
import { ErrorAlertService } from '../../../shared/components/error-alert/error-alert.service';
import { ErrorAlertComponent } from '../../../shared/components/error-alert/error-alert.component';


@Component({
  selector: 'app-compdesign-loads',
  standalone: true,
  imports: [CommonModule, CompressionComponent, CompressionbeamshapesComponent, ReactiveFormsModule, ErrorAlertComponent],
  templateUrl: './compdesign-loads.component.html',
  styleUrl: './compdesign-loads.component.scss'
})
export class CompdesignLoadsComponent {
  @Output() updateTableEvent = new EventEmitter<void>();

  constructor( private sharedService: SharedVariable, 
    public SharedElements: CompDesignService,
    private updater: CompdesignTableService,
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





  if (this.LargestKL && this.LargestKL !== null) {
    this.LargestKL.push({
      element: this.element.value ? 'y' : 'x',
      elemLength: elemLength,
      KFactor: KFactor,
      kL: kL,
      DL: DL,
      LL: LL,
      E: E,
      Fy: Fy,

      });
      
    } //this.SharedVariable.FeSolve();

    // Update maxKL if current kL is greater
    if (kL > this.maxKL) {
      this.maxKL = kL;
      console.log("Max kL updated to " + this.SharedElements.maxKL.value)
      //this.SharedVariable.FeSolve();
          }

  }


 
removeRow(index: number): void {
  if (this.LargestKL[index].kL === this.maxKL) {
    // Remove the row
    this.LargestKL.splice(index, 1);

    // Update maxKL
    this.maxKL = Math.max(...this.LargestKL.map(row => row.kL));
    console.log("Max kL/r downdated to " + this.SharedElements.maxKL.value);
  } else {
    // If maxKL is not in the row to be removed, just remove the row
    this.LargestKL.splice(index, 1);
  }
}




onRowSelect(index: number) {
  // Get the selected row
  const selectedRow = this.LargestKL[index];

  // Update the shared variables
  this.SharedElements.chosenElem.next(selectedRow.element);
  this.SharedElements.chosenElemLength.next(selectedRow.elemLength);
  this.SharedElements.chosenkL.next(selectedRow.kL);
  this.SharedElements.chosenKFactor.next(selectedRow.KFactor);
  // Add other shared variables as needed...
        let DL = Number(this.DL.value);
            this.SharedElements.DL.next(DL);
        let LL = Number(this.LL.value);
            this.SharedElements.LL.next(LL);
        let E = Number(this.E.value);
            this.SharedElements.E.next(E);
        let Fy = Number(this.Fy.value);
            this.SharedElements.Fy.next(Fy);


  console.log('Selected row:', selectedRow);
  console.log('Chosen KL is', this.SharedElements.chosenKFactor.value);
  this.refreshTable();
  console.log("sending update");
}

refreshTable() {
  this.updater.loadTable();
}


}
