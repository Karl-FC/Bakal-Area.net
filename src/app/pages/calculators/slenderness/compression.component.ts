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
        

                    //GET AREA GROSS - AG
                        const AgValue = this.sharedService.Ag.value;
                        //console.log("Previous Ag value:", this.sharedService.Ag.value);
                        // Update Ag form control with the calculated value
                        //this.sharedService.Ag.setValue(AgValue);
                        //console.log("New Ag value:", this.sharedService.Ag.value);
                            /*GET LAMDA
                                const bf2tfValue = this.sharedService.bf2tf.value;
                                console.log("Previous Lamda Flange value:", this.sharedService.bf2tf.value);
                                // Update Ag form control with the calculated value
                                this.sharedService.Ag.setValue(bf2tfValue);
                                console.log("New bf2tf value:", this.sharedService.bf2tf.value);*/
        


        //CALCULATION PROPER//
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
          
          // Update blockquote element
              let ResultFlange = this.el.nativeElement.querySelector('#ResultCompactnessFlange');
              let ResultWeb = this.el.nativeElement.querySelector('#ResultCompactnessWeb');

              if (this.flangeStatus !== 'Flange Status') {
                this.renderer.setStyle(ResultFlange, 'display', 'block');
                let badge = this.renderer.createElement('div');
                this.renderer.addClass(badge, 'badge');
                this.renderer.addClass(badge, 'gap-2');
                this.renderer.addClass(badge, this.flangeStatus === 'The flange is compact' ? 'badge-success' : this.flangeStatus === 'The flange is noncompact' ? 'badge-warning' : 'badge-error');
                let svg = this.renderer.createElement('svg', 'http://www.w3.org/2000/svg');

                this.renderer.setAttribute(svg, 'fill', 'none');
                this.renderer.setAttribute(svg, 'viewBox', '0 0 24 24');
                this.renderer.addClass(svg, 'inline-block');
                this.renderer.addClass(svg, 'w-4');
                this.renderer.addClass(svg, 'h-4');
                this.renderer.addClass(svg, 'stroke-current');
                let path = this.renderer.createElement('path', 'http://www.w3.org/2000/svg');

                this.renderer.setAttribute(path, 'stroke-linecap', 'round');
                this.renderer.setAttribute(path, 'stroke-linejoin', 'round');
                this.renderer.setAttribute(path, 'stroke-width', '2');
                this.renderer.setAttribute(path, 'd', 'M6 18L18 6M6 6l12 12');
                this.renderer.appendChild(svg, path);
                this.renderer.appendChild(badge, svg);
                this.renderer.setProperty(badge, 'innerHTML', this.flangeStatus.toUpperCase());
                this.renderer.setProperty(ResultFlange, 'innerHTML', '');
                this.renderer.appendChild(ResultFlange, badge);
                console.log("FLANGE UPDATED");
              } else {
                this.renderer.setStyle(ResultFlange, 'display', 'none');
              }

              if (this.WebStatus !== 'Web Status') {
                this.renderer.setStyle(ResultWeb, 'display', 'block');
                let badge = this.renderer.createElement('div');
                this.renderer.addClass(badge, 'badge');
                this.renderer.addClass(badge, 'gap-2');
                this.renderer.addClass(badge, this.WebStatus === 'The web is compact' ? 'badge-success' : this.WebStatus === 'The web is noncompact' ? 'badge-warning' : 'badge-error');
                let svg = this.renderer.createElement('svg', 'http://www.w3.org/2000/svg');
                this.renderer.setAttribute(svg, 'fill', 'none');
                this.renderer.setAttribute(svg, 'viewBox', '0 0 24 24');
                this.renderer.addClass(svg, 'inline-block');
                this.renderer.addClass(svg, 'w-4');
                this.renderer.addClass(svg, 'h-4');
                this.renderer.addClass(svg, 'stroke-current');
                let path = this.renderer.createElement('path', 'http://www.w3.org/2000/svg');
                this.renderer.setAttribute(path, 'stroke-linecap', 'round');
                this.renderer.setAttribute(path, 'stroke-linejoin', 'round');
                this.renderer.setAttribute(path, 'stroke-width', '2');
                this.renderer.setAttribute(path, 'd', 'M6 18L18 6M6 6l12 12');
                this.renderer.appendChild(svg, path);
                this.renderer.appendChild(badge, svg);
                this.renderer.setProperty(badge, 'innerHTML', this.WebStatus.toUpperCase());
                this.renderer.setProperty(ResultWeb, 'innerHTML', '');
                this.renderer.appendChild(ResultWeb, badge);
                console.log("WEB UPDATED");
              } else {
                this.renderer.setStyle(ResultWeb, 'display', 'none');
                const elemError = document.getElementById('elemError');
                console.log("No beam shape has selected");
                if (elemError) elemError.style.display = 'block';
                return;
              }}




        


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