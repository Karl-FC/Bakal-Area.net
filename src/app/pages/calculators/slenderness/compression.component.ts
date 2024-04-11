import { Component, Renderer2, ElementRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { style } from '@angular/animations';


@Component({
  selector: 'app-compression',
  standalone: true,
  imports: [ReactiveFormsModule, CompressionbeamshapesComponent],
  templateUrl: './compression.component.html',
  styleUrl: './compression.component.scss',
})

export class CompressionComponent{
  constructor(private renderer: Renderer2, 
              private el: ElementRef, 
              public sharedService: SharedVariable) { }

    
    E = new FormControl(this.sharedService.E, { updateOn: 'blur' });
    Fy = new FormControl(this.sharedService.Fy, { updateOn: 'blur' });

    Ag = new FormControl('');
    bf2tf = new FormControl('');
    htw = new FormControl('');

    F_Lamda = new FormControl('');
    W_Lamda = new FormControl('');

    inputType: string = 'true';
    flangeStatus: string = 'Flange Status';
    WebStatus: string = 'Web Status';



    
      calcCompact() {
        
        //CALCULATION PROPER//
          const AgValue = this.sharedService.Ag.value;

          let E = parseFloat((<HTMLInputElement>document.getElementById('ModulusE')).value);
          

          let Fy;
          if (this.inputType === "true") {
              Fy = parseFloat((<HTMLInputElement>document.getElementById('YieldStrengthType')).value);
          } else {
              Fy = parseFloat((<HTMLInputElement>document.getElementById('YieldStrengthSelect')).value);
          }


 // Get the new values from your form controls
 let EValue = this.sharedService.E ? this.sharedService.E.value : 0;
 let FyValue = this.sharedService.Fy ? this.sharedService.Fy.value : 0;


 // Update the values in the shared service
 this.sharedService.E.next(E);
 this.sharedService.Fy.next(Fy);


          let F_Lamda = parseFloat((<HTMLInputElement>document.getElementById('LamdaFlange')).value);
          let W_Lamda = parseFloat((<HTMLInputElement>document.getElementById('LamdaWeb')).value);
              console.log("Modulus of Elasticity is " + E);
              console.log("Yieild Strentgh is " + Fy);
              console.log("bf/tf or Lamda F is " + F_Lamda);
              console.log("htw or Lamda W is " + W_Lamda);
        
        //Checking Slenderness//    
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
                this.renderer.setStyle(BgCompactnessFlange,'width', '200px');
                this.renderer.setStyle(BgCompactnessWeb,'width', '200px');

                      if (this.flangeStatus === 'The flange is compact') {
                        this.renderer.addClass(BgCompactnessFlange, 'bg-success');
                        this.renderer.setProperty(ResultFlange, 'innerHTML', 'COMPACT');
                        this.renderer.setStyle(ResultFlange,'font-size', '32px');

                    } else if (this.flangeStatus === 'The flange is noncompact') {
                        this.renderer.addClass(BgCompactnessFlange, 'bg-warning');
                        this.renderer.setProperty(ResultFlange, 'innerHTML', 'NONCOMPACT');
                        this.renderer.setStyle(ResultFlange,'font-size', '20px');
                    } else if (this.flangeStatus === 'The flange is slender') {
                        this.renderer.addClass(BgCompactnessFlange, 'bg-error');
                        this.renderer.setProperty(ResultFlange, 'innerHTML', 'SLENDER');
                        this.renderer.setStyle(ResultFlange,'font-size', '32px');
                }
              
                this.renderer.setStyle(SubCompactnessWeb, 'display', 'none');
                this.renderer.removeClass(BgCompactnessWeb, 'bg-success');
                this.renderer.removeClass(BgCompactnessWeb, 'bg-warning');
                this.renderer.removeClass(BgCompactnessWeb, 'bg-error');
                      if (this.WebStatus === 'The web is compact') {
                          this.renderer.addClass(BgCompactnessWeb, 'bg-success');
                          this.renderer.setProperty(ResultWeb, 'innerHTML', 'COMPACT');
                          this.renderer.setStyle(ResultWeb,'font-size', '32px');
                      } else if (this.WebStatus === 'The web is noncompact') {
                          this.renderer.addClass(BgCompactnessWeb, 'bg-warning');
                          this.renderer.setProperty(ResultWeb, 'innerHTML', 'NONCOMPACT');
                          this.renderer.setStyle(ResultWeb,'font-size', '20px');
                      } else if (this.WebStatus === 'The web is slender') {
                          this.renderer.addClass(BgCompactnessWeb, 'bg-error');
                          this.renderer.setProperty(ResultWeb, 'innerHTML', 'SLENDER');
                          this.renderer.setStyle(ResultWeb,'font-size', '32px');
                }
      }




        


    FyInputType() {
      const fyDropdown = document.getElementById('FyDropdown');
      const fyNumType = document.getElementById('FyNumType');
        if (fyDropdown) fyDropdown.style.display = 'none';
        if (fyNumType) fyNumType.style.display = 'block';
      
      }
    

    FyInputDrop() {
      const fyDropdown = document.getElementById('FyDropdown');
      const fyNumType = document.getElementById('FyNumType');

        if (fyDropdown) fyDropdown.style.display = 'block';
        if (fyNumType) fyNumType.style.display = 'none';
      }
    
    
  




    }