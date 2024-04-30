import { Component, Renderer2, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedVariable } from '../../../shared.service';
import { ErrorAlertComponent } from '../../../shared/components/error-alert/error-alert.component';
import { ErrorAlertService } from '../../../shared/components/error-alert/error-alert.service';
import { CommonModule } from '@angular/common';
import { BlockshearService } from '../blockshear/blockshear.service';
import { TensionbeamshapesComponent } from '../../../shared/data/tensionbeamshapes/tensionbeamshapes.component';

@Component({
  selector: 'app-netarea',
  standalone: true,
  imports: [ReactiveFormsModule, TensionbeamshapesComponent, ErrorAlertComponent, FormsModule, CommonModule],
  templateUrl: './netarea.component.html',
  styleUrl: './netarea.component.scss'
})
export class NetareaComponent {
  constructor(private renderer: Renderer2, 
    private el: ElementRef, 
    public sharedService: SharedVariable,
  private errAlert: ErrorAlertService,
public BlockshearService: BlockshearService) { }

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

CalcBendIng() {
  this.calcBend();

  // Use setTimeout to call yourFunction again after a 1 second delay
  setTimeout(() => this.calcBend(), 2000);
}





}