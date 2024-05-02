import { Component, Renderer2, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { ErrorAlertComponent } from '../../../shared/components/error-alert/error-alert.component';
import { ErrorAlertService } from '../../../shared/components/error-alert/error-alert.service';
import { CommonModule } from '@angular/common';
import { MaxMomentsService } from '../maxmoments/maxmoments.service';


@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [ReactiveFormsModule, CompressionbeamshapesComponent, ErrorAlertComponent, FormsModule, CommonModule],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CvComponent {
   constructor(private renderer: Renderer2, 
  private el: ElementRef, 
  public sharedService: SharedVariable,
private errAlert: ErrorAlertService,
public MaxMomentsService: MaxMomentsService) { }

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




ShearCalc() {
this.MaxMomentsService.Shears();

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
this.MaxMomentsService.E = E
this.sharedService.Fy.next(Fy);

  



//ERROR MESSAGE//

//No E o /fy
if (!E || !Fy) {
  const elemError = document.getElementById('elemError');
  console.log("No E was inputed");
  this.errAlert.errorAlert('noBeam');
  return;
  };
}


ngOnInit() {
this.sharedService.subTitle = 'Shear Strength of Webs without Tension Field Action';
}

ShearCalcAgain() {
  this.ShearCalc();

  // Use setTimeout to call yourFunction again after a 1 second delay
  setTimeout(() => this.ShearCalc(), 2000);
}

}