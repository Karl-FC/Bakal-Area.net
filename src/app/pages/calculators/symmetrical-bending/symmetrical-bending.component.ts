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






}