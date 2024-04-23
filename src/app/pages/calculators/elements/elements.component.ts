import { Component, Renderer2, ElementRef } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { CompressionComponent } from '../slenderness/compression.component';
import { CommonModule } from '@angular/common';
import { AnalysisTableRow } from './elements-table-row.interface';
import { beamShape } from '../../../shared.service';
import { ElasticBucklingService } from '../elastic-buckling/elastic-buckling.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ErrorAlertComponent } from '../../../shared/components/error-alert/error-alert.component';
import { ErrorAlertService } from '../../../shared/components/error-alert/error-alert.service';


@Component({
  selector: 'app-elements',
  standalone: true,
  imports: [CommonModule, CompressionComponent, CompressionbeamshapesComponent, ReactiveFormsModule, DragDropModule, ErrorAlertComponent],
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.scss'
})

export class ElementsComponent {
  selectedBeamShape: beamShape | null = null; 
  
constructor( public sharedService: SharedVariable, 
            private SharedVariable: ElasticBucklingService,
          private errAlert: ErrorAlertService) {}

  AnalysisRows: { 
    element: string, 
    elemLength: number, 
    KFactor: number, 
    radiusGyration: number, 
    kLr: number }[] = []; //Make array


  element = new FormControl('');
  elemLength = new FormControl('', Validators.pattern("^[0-9]*\.?[0-9]*$"));
  KFactor = new FormControl('', Validators.pattern("^[0-9]*\.?[0-9]*$"));

  get maxKLr() {
    return this.sharedService.maxKLr.value;
    
  }

  set maxKLr(value: number) {
    this.sharedService.maxKLr.next(value);
  }
  
  onBeamShapeSelected(event: Event): void {
    console.log("onBeamShapeSelected is working");
    
    const target = event.target as HTMLSelectElement;
    const selectedManualLabel = target.value;
    console.log("Selected Manual Label is " + selectedManualLabel)}

    
  addRow() {
    console.log("addRow kinda works");
    console.log("Max kL/r is " + this.sharedService.maxKLr.value)
    const selectedBeamShape = this.sharedService.chosenBeamShape.value;
    
            //No beam
            if (!selectedBeamShape) {
              const elemError = document.getElementById('elemError');
              console.log("No beam shape has selected");
              this.errAlert.errorAlert('noBeam');
              return;
              };

            //No Length
            if (!this.insertLength()) {
              const elemError = document.getElementById('elemError');
              console.log("No length was inputed");
              this.errAlert.errorAlert('noL');
              return;
              };

            //No Support
            if (!this.KFactor.value) {
              const elemError = document.getElementById('elemError');
              console.log("No support condition was inputed");
              this.errAlert.errorAlert('no Supp Condition');
              return;
              };

  const radiusGyration = this.element.value ? 
  Number(selectedBeamShape.ry) : Number(selectedBeamShape.rx);
  console.log("Radius of Gyration is " + radiusGyration);



    //Calculating kL/r
    let elemLength = Number(this.elemLength.value);
    let KFactor = Number(this.KFactor.value)
    let kLr = Number(((elemLength * KFactor) / radiusGyration).toFixed(6));
        console.log("Inputed length is " + elemLength);
        console.log("Slected K is " + KFactor);
        console.log("kLr is " + kLr);


    if (this.AnalysisRows && this.AnalysisRows !== null) {
      this.AnalysisRows.push({
        element: this.element.value ? 'y' : 'x',
        elemLength: elemLength,
        KFactor: KFactor,
        radiusGyration: radiusGyration,
        kLr: kLr
        });
        
      } this.SharedVariable.FeSolve();

      // Update maxKLr if current kLr is greater
      if (kLr > this.maxKLr) {
        this.maxKLr = kLr;
        console.log("Max kL/r updated to " + this.sharedService.maxKLr.value)
        this.SharedVariable.FeSolve();
  }

    }


  insertLength() {
    let L = parseFloat((<HTMLInputElement>document.getElementById('elemLength')).value);
    console.log("Lenght is " + L);
    return L;

  }

   
  removeRow(index: number): void {
    if (this.AnalysisRows[index].kLr === this.maxKLr) {
      // Remove the row
      this.AnalysisRows.splice(index, 1);
  
      // Update maxKLr
      this.maxKLr = Math.max(...this.AnalysisRows.map(row => row.kLr));
      console.log("Max kL/r downdated to " + this.sharedService.maxKLr.value);
    } else {
      // If maxKLr is not in the row to be removed, just remove the row
      this.AnalysisRows.splice(index, 1);
    }
  }

  maxkLr() {

  }
}
