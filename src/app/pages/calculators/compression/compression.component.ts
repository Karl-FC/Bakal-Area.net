import { Component } from '@angular/core';

@Component({
  selector: 'app-compression',
  standalone: true,
  imports: [],
  templateUrl: './compression.component.html',
  styleUrl: './compression.component.scss'
})
export class CompressionComponent{
    E: number = 0;
    Fy: number = 0;
    Ag: number = 0;
    F_Lamda: number = 0;
    W_Lamda: number = 0;
    flangeStatus: string = 'Flange Status';
    WebStatus: string = 'Web Status';


      calculate() {
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

        if (W_Lamda < W_LamdaP) {
          this.WebStatus = "The web is compact";
        } else if (W_Lamda >= W_LamdaP && W_Lamda < W_LamdaR) {
          this.WebStatus = "The web is noncompact";
        } else if (W_Lamda >= W_LamdaR) {
          this.WebStatus = "The web is slender";
        }
        
        // Update the blockquote element
        let flangeElement = document.getElementById('ResultCompactnessFlange');
            if (flangeElement) {
              flangeElement.textContent = this.flangeStatus;
            }
        let webElement = document.getElementById('ResultCompactnessWeb');
          if (webElement) {
            webElement.textContent = this.WebStatus;        
            }
}
}
