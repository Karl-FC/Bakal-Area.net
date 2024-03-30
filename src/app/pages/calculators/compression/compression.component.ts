import { Component, Renderer2, ElementRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';


@Component({
  selector: 'app-compression',
  standalone: true,
  imports: [ReactiveFormsModule, CompressionbeamshapesComponent],
  templateUrl: './compression.component.html',
  styleUrl: './compression.component.scss',
})

export class CompressionComponent{
  constructor(private renderer: Renderer2, private el: ElementRef, private sharedService: SharedVariable) { }

    E = new FormControl('');
    Fy = new FormControl('');
    Ag = new FormControl('');
    F_Lamda = new FormControl('');
    W_Lamda = new FormControl('');
    flangeStatus: string = 'Flange Status';
    WebStatus: string = 'Web Status';


      calcCompact() {
        let E = parseFloat((<HTMLInputElement>document.getElementById('ModulusE')).value);
        console.log("Modulus of Elasticity is " + E);
        let Fy = parseFloat((<HTMLInputElement>document.getElementById('YieldStrength')).value);
        console.log("Yieild Strentgh is " + Fy);
        let F_Lamda = parseFloat((<HTMLInputElement>document.getElementById('LamdaFlange')).value);
        console.log("bf/tf or Lamda F is " + F_Lamda);
        let W_Lamda = parseFloat((<HTMLInputElement>document.getElementById('LamdaWeb')).value);
        console.log("bf/tf or Lamda W is " + W_Lamda);

        
        let F_LamdaP = 0.38 * Math.sqrt(E / Fy);
        let F_LamdaR = 1.0 * Math.sqrt(E / Fy);
        console.log("Flange Lamda P is " + F_LamdaP);
        console.log("Flange Lamda R is " + F_LamdaR);

        // If statements sa flange
        if (F_Lamda < F_LamdaP) {
          this.flangeStatus = "The flange is compact";
        } else if (F_Lamda >= F_LamdaP && F_Lamda < F_LamdaR) {
          this.flangeStatus = "The flange is noncompact";
        } else if (F_Lamda >= F_LamdaR) {
          this.flangeStatus = "The flange is slender";
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
        
        // Update the blockquote element
        let ResultFlange = this.el.nativeElement.querySelector('#ResultCompactnessFlange');
        let ResultWeb = this.el.nativeElement.querySelector('#ResultCompactnessWeb');

  if (this.flangeStatus !== 'Flange Status') {
    this.renderer.setStyle(ResultFlange, 'display', 'block');
    this.renderer.setStyle(ResultFlange, 'color', this.flangeStatus === 'The flange is compact' ? 'green' : 'red');
    this.renderer.setProperty(ResultFlange, 'textContent', this.flangeStatus);
  } else {
    this.renderer.setStyle(ResultFlange, 'display', 'none');
  }

  if (this.WebStatus !== 'Web Status') {
    this.renderer.setStyle(ResultWeb, 'display', 'block');
    this.renderer.setStyle(ResultWeb, 'color', this.WebStatus === 'The web is compact' ? 'green' : 'red');
    this.renderer.setProperty(ResultWeb, 'textContent', this.WebStatus);
  } else {
    this.renderer.setStyle(ResultWeb, 'display', 'none');
  }
}
}
