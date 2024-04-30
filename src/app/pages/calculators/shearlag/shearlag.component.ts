import { Component, Renderer2, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { CompressionComponent } from '../slenderness/compression.component';
import { CommonModule } from '@angular/common';
import { beamShape } from '../../../shared.service';
import { ElasticBucklingService } from '../elastic-buckling/elastic-buckling.service';
import { ErrorAlertComponent } from '../../../shared/components/error-alert/error-alert.component';
import { ErrorAlertService } from '../../../shared/components/error-alert/error-alert.service';

@Component({
  selector: 'app-shearlag',
  standalone: true,
  imports: [CommonModule, CompressionComponent, CompressionbeamshapesComponent,
    ReactiveFormsModule, ErrorAlertComponent, FormsModule],
  templateUrl: './shearlag.component.html',
  styleUrl: './shearlag.component.scss'
})
export class ShearlagComponent {

  constructor( public sharedService: SharedVariable, 
    private SharedVariable: ElasticBucklingService,
  private errAlert: ErrorAlertService) {}

  shearCase: number = 0
  shearLag: number = 1
  eccentricity: number = 0
  connectLength: number = 0;
  
  CaseSeven: number = 0;//Case 7
  twothirdD: number = 0;// 2d/3

  CaseEight: number = 0;//Case 8


    shearNoNeedCalc(caseCase: number) {
        this.shearLag = caseCase
        this.sharedService.shearLagFactor = this.shearLag
        console.log('Shear lag is ' + this.shearLag + ', shearlagfactor namen = ' + this.sharedService.shearLagFactor)
        if (this.CaseSeven==1) {
          this.shearCase7Calc()
        }

  }

    shearCase7Calc() {
      let d = this.sharedService.d.value
      let bf = this.sharedService.bf.value
      this.twothirdD = (2/3)*d
          if (bf >= this.twothirdD) {
            this.shearLag = 0.9;
          } else {this.shearLag = 0.85}
          this.sharedService.shearLagFactor = this.shearLag
          console.log('Shear lag is ' + this.shearLag + ', shearlagfactor namen = ' + this.sharedService.shearLagFactor)
    }
    
    shearCalc(){
      if (this.shearCase==2) {
        let x = this.eccentricity
        let l = this.connectLength

        this.shearLag = 1-(x/l)
        this.sharedService.shearLagFactor = this.shearLag
        console.log('Shear lag is ' + this.shearLag + ', shearlagfactor namen = ' + this.sharedService.shearLagFactor)
      }
    }








}
