import { Component, Renderer2, ElementRef } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { CompressionComponent } from '../slenderness/compression.component';
import { CommonModule } from '@angular/common';
import { AnalysisTableRow } from './elements-table-row.interface';
import { beamShape } from '../../../shared.service';

@Component({
  selector: 'app-elements',
  standalone: true,
  imports: [CommonModule, CompressionComponent, CompressionbeamshapesComponent, ReactiveFormsModule],
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.scss'
})

export class ElementsComponent {
  selectedBeamShape: beamShape | null = null; 
  
constructor( private sharedService: SharedVariable) {}

  AnalysisRows: { 
    element: string, 
    elemLength: number, 
    KFactor: number, 
    radiusGyration: number, 
    kLr: number }[] = []; //Make array

  element = new FormControl('');
  elemLength = new FormControl('', Validators.pattern("^[0-9]*\.?[0-9]*$"));
  KFactor = new FormControl('', Validators.pattern("^[0-9]*\.?[0-9]*$"));

  onBeamShapeSelected(event: Event): void {
    console.log("onBeamShapeSelected is working");
    
    const target = event.target as HTMLSelectElement;
    const selectedManualLabel = target.value;}

    
  addRow() {
    console.log("addRow kinda works");

    const selectedBeamShape = this.sharedService.chosenBeamShape.value;

  if (!selectedBeamShape) {
    console.log("No beam shape has selected");
    return;
  }

  const radiusGyration = this.element.value ? 
  Number(selectedBeamShape.ry) : Number(selectedBeamShape.rx);
  console.log("Radius of Gyration is " + radiusGyration);



    //Calculating kL/r
    let elemLength = Number(this.elemLength.value);
    let KFactor = Number(this.KFactor.value)
    let kLr = (elemLength * KFactor)/radiusGyration;
        console.log("Length is " + elemLength);
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
      }
    }


  insertLength() {
    let L = parseFloat((<HTMLInputElement>document.getElementById('elemLength')).value);
    console.log("Lenght is " + L);
  }

   
  removeRow(index: number): void {
    this.AnalysisRows.splice(index, 1);
  }
}
 /* updateSelectedElement(element: string): void {
    this.AnalysisRows = element;
  }

  updateSelectedLength(length: number): void {
    this.AnalysisRows = length;
  }

  updateSelectedKFactor(kFactor: number): void {
    this.selectedKFactor = kFactor;
  }
}*/