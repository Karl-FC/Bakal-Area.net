import { Component, Renderer2, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { style } from '@angular/animations';
import { ErrorAlertComponent } from '../../../shared/components/error-alert/error-alert.component';
import { ErrorAlertService } from '../../../shared/components/error-alert/error-alert.service';
import { CommonModule } from '@angular/common';
import { FlexresultsService } from '../flexresults/flexresults.service';

@Component({
  selector: 'app-symmetrical-bending',
  standalone: true,
  imports: [ReactiveFormsModule, CompressionbeamshapesComponent, ErrorAlertComponent, FormsModule, CommonModule],
  templateUrl: './symmetrical-bending.component.html',
  styleUrl: './symmetrical-bending.component.scss'
})

export class SymmetricalBendingComponent {
  constructor(private renderer: Renderer2, 
    private el: ElementRef, 
    public sharedService: SharedVariable,
  private errAlert: ErrorAlertService,
private FlexresultsService: FlexresultsService) { }

E = new FormControl(this.sharedService.E, { updateOn: 'blur' });
Fy = new FormControl(this.sharedService.Fy, { updateOn: 'blur' });

Ag = new FormControl('');
depth = new FormControl('');
htw = new FormControl('');

F_Lamda = new FormControl('');
W_Lamda = new FormControl('');

inputType: string = 'true';
flangeStatus: string = 'Flange Status';
WebStatus: string = 'Web Status';




calcBend() {
  this.FlexresultsService.Centroid();

//CALCULATION PROPER//
const AgValue = this.sharedService.Ag.value;

// Kuha input from input
let E = parseFloat((<HTMLInputElement>document.getElementById('ModulusE')).value);

let Fy;
if (this.inputType === "true") {
    Fy = parseFloat((<HTMLInputElement>document.getElementById('YieldStrengthType')).value);
} else {
    Fy = parseFloat((<HTMLInputElement>document.getElementById('YieldStrengthSelect')).value);
}

let EValue = this.sharedService.E ? this.sharedService.E.value : 0;
let FyValue = this.sharedService.Fy ? this.sharedService.Fy.value : 0;


// Update papunta sa shared service
this.sharedService.E.next(E);
this.sharedService.Fy.next(Fy);

    //Checking Slenderness//    
    let F_LamdaP = 0.38 * Math.sqrt(E / Fy);
    this.sharedService.F_LamdaP = F_LamdaP
    let F_LamdaR = 1.0 * Math.sqrt(E / Fy);
    this.sharedService.F_LamdaR = F_LamdaR
    console.log("Flange Lamda P is " + F_LamdaP);
    console.log("Flange Lamda R is " + F_LamdaR);

    let F_Lamda = parseFloat((<HTMLInputElement>document.getElementById('LamdaFlange')).value);
    let W_Lamda = parseFloat((<HTMLInputElement>document.getElementById('LamdaWeb')).value);
        console.log("Modulus of Elasticity is " + E);
        console.log("Yieild Strentgh is " + Fy);
        console.log("bf/tf or Lamda F is " + F_Lamda);
        console.log("htw or Lamda W is " + W_Lamda);

        // If statements sa flange
        if (F_Lamda < F_LamdaP) {
          this.sharedService.flangeStatus = "compact"
        } else if (F_Lamda >= F_LamdaP && F_Lamda < F_LamdaR) {
          this.sharedService.flangeStatus = "noncompact";
        } else if (F_Lamda >= F_LamdaR) {
          this.sharedService.flangeStatus = "slender";
        }
      
    let W_LamdaP = 3.76 * Math.sqrt(E / Fy);
    let W_LamdaR = 5.70 * Math.sqrt(E / Fy);
    console.log("Web Lamda P is " + W_LamdaP);
    console.log("Web Lamda R is " + W_LamdaR);

        // If statements sa web
        if (W_Lamda < W_LamdaP) {
          this.WebStatus = "The web is compact";
        } else if (W_Lamda >= W_LamdaP && W_Lamda < W_LamdaR) {
          this.WebStatus = "The web is noncompact";
        } else if (W_Lamda >= W_LamdaR) {
          this.WebStatus = "The web is slender";
        }
      
      // Update results card
          let ResultFlange = this.el.nativeElement.querySelector('#ResultCompactnessFlange');
          let ResultWeb = this.el.nativeElement.querySelector('#ResultCompactnessWeb');
          let BgCompactnessFlange = this.el.nativeElement.querySelector('#BgCompactnessFlange');
          let BgCompactnessWeb = this.el.nativeElement.querySelector('#BgCompactnessWeb');
          let SubCompactnessFlange = this.el.nativeElement.querySelector('#SubCompactnessFlange');
          let SubCompactnessWeb = this.el.nativeElement.querySelector('#SubCompactnessWeb');

            this.renderer.setStyle(SubCompactnessFlange, 'display', 'none');
            this.renderer.removeClass(BgCompactnessFlange, 'bg-success');
            this.renderer.removeClass(BgCompactnessFlange, 'bg-warning');
            this.renderer.removeClass(BgCompactnessFlange, 'bg-error');
            this.renderer.setStyle(BgCompactnessFlange,'width', '180px');
            this.renderer.setStyle(BgCompactnessWeb,'width', '180px');

                  if (this.sharedService.flangeStatus === 'compact') {
                    this.renderer.addClass(BgCompactnessFlange, 'bg-success');
                    this.renderer.setProperty(ResultFlange, 'innerHTML', 'COMPACT');
                    this.renderer.setStyle(ResultFlange,'font-size', '28px');

                } else if (this.sharedService.flangeStatus === 'noncompact') {
                    this.renderer.addClass(BgCompactnessFlange, 'bg-warning');
                    this.renderer.setProperty(ResultFlange, 'innerHTML', 'NONCOMPACT');
                    this.renderer.setStyle(ResultFlange,'font-size', '18px');
                } else if (this.sharedService.flangeStatus === 'slender') {
                    this.renderer.addClass(BgCompactnessFlange, 'bg-error');
                    this.renderer.setProperty(ResultFlange, 'innerHTML', 'SLENDER');
                    this.renderer.setStyle(ResultFlange,'font-size', '28px');
            }
          
            this.renderer.setStyle(SubCompactnessWeb, 'display', 'none');
            this.renderer.removeClass(BgCompactnessWeb, 'bg-success');
            this.renderer.removeClass(BgCompactnessWeb, 'bg-warning');
            this.renderer.removeClass(BgCompactnessWeb, 'bg-error');
                  if (this.WebStatus === 'The web is compact') {
                      this.renderer.addClass(BgCompactnessWeb, 'bg-success');
                      this.renderer.setProperty(ResultWeb, 'innerHTML', 'COMPACT');
                      this.renderer.setStyle(ResultWeb,'font-size', '28px');
                  } else if (this.WebStatus === 'The web is noncompact') {
                      this.renderer.addClass(BgCompactnessWeb, 'bg-warning');
                      this.renderer.setProperty(ResultWeb, 'innerHTML', 'NONCOMPACT');
                      this.renderer.setStyle(ResultWeb,'font-size', '18px');
                  } else if (this.WebStatus === 'The web is slender') {
                      this.renderer.addClass(BgCompactnessWeb, 'bg-error');
                      this.renderer.setProperty(ResultWeb, 'innerHTML', 'SLENDER');
                      this.renderer.setStyle(ResultWeb,'font-size', '28px');
            }











//ERROR MESSAGE//
  
  //No E o /fy
  if (!E || !Fy) {
    const elemError = document.getElementById('elemError');
    console.log("No E was inputed");
    this.errAlert.errorAlert('noBeam');
    return;
    };


}

SymmetryChange() {
  let isSymmetry = this.sharedService.isSymmetry
  const secondFlanges = this.el.nativeElement.querySelector('#secondFlanges');
  const beamdropdown = this.el.nativeElement.querySelector('#beamdropdown');
  const subtitleReplacement = this.el.nativeElement.querySelector('#subtitleReplacement');
  const AreaGross = this.el.nativeElement.querySelector('#AreaGross');
    if (isSymmetry) {this.sharedService.isSymmetry = false;
      this.renderer.setStyle(subtitleReplacement, 'display', 'block');
      this.renderer.setStyle(secondFlanges, 'display', 'block');
      this.renderer.setStyle(beamdropdown, 'display', 'none');
      this.renderer.setStyle(AreaGross, 'display', 'none');
          }
     
    
    else {this.sharedService.isSymmetry = true;
    this.renderer.setStyle(subtitleReplacement, 'display', 'none');
    this.renderer.setStyle(secondFlanges, 'display', 'none');
    this.renderer.setStyle(beamdropdown, 'display', 'block');
    this.renderer.setStyle(AreaGross, 'display', 'block');
    }

}

ngOnInit() {
  this.sharedService.subTitle = 'For Doubly-Symmetric Sections';
}

CalcBendIng() {
  this.calcBend();

  // Use setTimeout to call yourFunction again after a 1 second delay
  setTimeout(() => this.calcBend(), 2000);
}





}