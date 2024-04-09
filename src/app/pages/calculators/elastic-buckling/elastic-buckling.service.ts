import { Injectable } from '@angular/core';
import { SharedVariable } from '../../../shared.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Renderer2, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElasticBucklingService {
  constructor(public sharedService: SharedVariable) { }

  Fe: number = 0
  Fcheck: number = 0
  Load = new FormControl('');

  FeSolve() {
    console.log("~~~~FE SOLVE~~~~~")
    //4.71 * Sqrt(E/Fy)

    let E = this.sharedService.E.value;
    let Fy = this.sharedService.Fy.value;
    let maxKLr = this.sharedService.maxKLr.value;
    let Ag = this.sharedService.Ag.value;
    let Load = this.sharedService.Load.value
    
    let Fcheck = 4.71* (Math.sqrt(E/Fy))
    console.log("4.71 * Sqrt(E/Fy) is " + Fcheck)
    console.log("E is " + E + ", Fy is " + Fy + "HAHAHAHAH")

    //Fe:
    let Fe = (Math.pow(Math.PI, 2) * E) / Math.pow(maxKLr, 2);
    console.log("Fe= (PI^2E)/ (MaxKLr)^2 " + Fe)
    console.log("Fe= (" + (Math.pow(Math.PI, 2)) + " * " + E + ")/ (" + maxKLr + ")^2 " + Fe)
      console.log("THEREFORE, Fe is " + Fe)
      console.log ("Max KLr is " + maxKLr)

    //Solutions if Fe is > or < 4.71 chuchu
    if (Fe <= Fcheck) {
            console.log("Fe is less than" + Fcheck + ", so 0.658 gagamitin")
            let Fcr = (Math.pow(0.658, (Fy/Fe)) ) * (Fy)
            console.log("let Fcr = (0.658^ (Fe/Fy) * Fy", "Fcr = (0.658^ (" + Fe + " / " + Fy + ") * " + Fy)
            console.log("Fcr is " + Fcr)
         
            //SOLVING PCR
                  let Pcr = Fcr*Ag;
                  console.log("Pcr = Fcr*Ag, Pcr= " + Fcr + " * " + Ag)
                  console.log ("Pcr is " + Pcr)
            
                //LRFD
                  let Ro = 0.9
                  let Pu = Ro*Pcr
                  console.log ("Pu is " + Pu)

                  //CHECKING
                    if (Pu > Load) {console.log ("Selected Beam is SAFE")} 
                      else {console.log ("Selected Beam is UNSAFE")} 

        
      } else {
            console.log("Fe is greater than" + Fcheck + ", so 0.0.877Fe gagamitin") 
            let Fcr = 0.877 * Fe
            console.log("let Fcr = 0.877 * Fe", "Fcr = 0.877 * " + Fe)
            console.log("Fcr is " + Fcr);

                  //SOLVING PCR
                        let Pcr = Fcr*Ag;
                  console.log("Pcr = Fcr*Ag, Pcr= " + Fcr + " * " + Ag)
                  console.log ("Pcr is " + Pcr)

                  //LRFD
                  let Ro = 0.9
                  let Pu = Ro*Pcr
                    console.log ("Pu is " + Pu)

                    //CHECKING
                    if (Pu > Load) {console.log ("Selected Beam is SAFE")} 
                    else {console.log ("Selected Beam is UNSAFE")} 
                  }

      //
      
  }
}
