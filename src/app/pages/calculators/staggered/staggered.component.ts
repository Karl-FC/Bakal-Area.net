import { Component, Renderer2, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { CompressionComponent } from '../slenderness/compression.component';
import { CommonModule } from '@angular/common';
import { beamShape } from '../../../shared.service';
import { BlockshearService } from '../blockshear/blockshear.service';
import { ErrorAlertComponent } from '../../../shared/components/error-alert/error-alert.component';
import { ErrorAlertService } from '../../../shared/components/error-alert/error-alert.service';
import { ShearlagComponent } from '../shearlag/shearlag.component';

@Component({
  selector: 'app-staggered',
  standalone: true,
  imports: [CommonModule, CompressionComponent, ShearlagComponent,
     ReactiveFormsModule, ErrorAlertComponent, FormsModule],
  templateUrl: './staggered.component.html',
  styleUrl: './staggered.component.scss'
})
export class StaggeredComponent {
  selectedBeamShape: beamShape | null = null; 
  
  constructor( public sharedService: SharedVariable, 
            public BlockshearService: BlockshearService,
            private errAlert: ErrorAlertService) {}
  
  isExpanded:string = ''

  //Bolts
  holePunch = new FormControl(true);   //Punching standard hole (1/16)
  holeDmg = new FormControl(true);   //Damaged hole edge (1/16)

  get updateholePunch() {
    return this.holePunch.value ? 1/16 : 0;
    return this.BlockshearService.hPunch ? 1/16 : 0;
  }

  get updateholeDmg() {
    return this.holeDmg.value ? 1/16 : 0;
    this.BlockshearService.hDamage = this.updateholeDmg;
  }


    staggerTable: { 
      stagPath: string, 
      s: number, 
      g: number, 
      t: number, 
      sgt: number }[] = []; //Make array
  
  
    stagPath = new FormControl('');
    elemS = new FormControl('', Validators.pattern("^[0-9]*\.?[0-9]*$"));
    elemG = new FormControl('', Validators.pattern("^[0-9]*\.?[0-9]*$"));
    elemSGT:number = 0;
    elemT:number = 0;
    Ubs:number = 0;
  

   

    
    onBeamShapeSelected(event: Event): void {
      console.log("onBeamShapeSelected is working");
      
      const target = event.target as HTMLSelectElement;
      const selectedManualLabel = target.value;
      console.log("Selected Manual Label is " + selectedManualLabel)}
  
      
    addRow() {
      console.log("addRow kinda works");
      const selectedBeamShape = this.sharedService.chosenBeamShape.value;

      let t = this.sharedService.t
        
              //No Length
              if (!this.inserts()) {
                const elemError = document.getElementById('elemError');
                console.log("No length was inputed");
                this.errAlert.errorAlert('noL');
                return;
                };
  
              //No Support
              if (!this.elemG.value) {
                const elemError = document.getElementById('elemError');
                console.log("No support condition was inputed");
                this.errAlert.errorAlert('no Supp Condition');
                return;
                };
  
      //Calculating SGT
      let elemS = Number(this.elemS.value);
      let elemG = Number(this.elemG.value);
      let elemT = this.sharedService.t.value;
      let SGTnumerator = Math.pow(elemS,2);
      let SGTdenominator = 4*elemG
      let elemSGT = (SGTnumerator/SGTdenominator)*elemT
      //let (S^2/4g)t = 
          console.log("Inputed s is " + elemS);
          console.log("Inputed g is " + elemG);
          console.log("sgt is " + elemSGT);
  
  
      if (this.staggerTable && this.staggerTable !== null) {
        this.staggerTable.push({
          stagPath: this.stagPath.value ?? '',
          s: elemS ?? '',
          g: elemG ?? '',
          t: elemT ?? '',
          sgt: elemSGT ?? ''
          });
          
        }

        this.getTotalSgt();
        
  
      }
  
getTotalSgt() {
  let total = this.staggerTable.reduce((total, row) => total + row.sgt, 0);
  this.sharedService.totalSgt = total;
  console.log("this.sharedService.totalSgt is " + this.sharedService.totalSgt);
  return total;
}


    inserts() {
      let s = parseFloat((<HTMLInputElement>document.getElementById('elemS')).value);
      console.log("s is " + s);
      return s;
  
    }
     
    removeRow(index: number): void {
      let removedSgt = this.staggerTable[index].sgt;
    
      this.staggerTable.splice(index, 1);
    
      this.sharedService.totalSgt -= removedSgt;
    
      console.log("this.sharedService.totalSgt is " + this.sharedService.totalSgt);
    }
    
  

 TensileSolve(){
  this.BlockshearService.TensileStrength();
 };
  
  }
  