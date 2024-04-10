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
  FeResult: string = '';
  FcrResult: string = '';
  PcrResult: string = '';
  PnResult: string = '';
  LRFDResult: string = '';
  ASDResult: string = '';
  displayLRFDResult: string = '';
  displayASDResult: string = '';
  result: string = '';

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
    if (Fe) {this.FeResult = "Fe = " + Fe};
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
            if (Fcr) {this.FcrResult = "Fcr = " + Fcr};
         
            //SOLVING PCR
                  let Pcr = Fcr*Ag;
                  console.log("Pcr = Fcr*Ag, Pcr= " + Fcr + " * " + Ag)
                  console.log ("Pcr is " + Pcr)
                  if (Pcr) {this.PcrResult = "Pcr = Pn =" + Pcr};
            
                //LRFD
                let Ro = 0.9
                let PuLRFD = Ro*Pcr
                let displayPuLRFD = PuLRFD.toFixed(3);
                  console.log ("Pu is " + PuLRFD)
                  if (PuLRFD) {(this.LRFDResult = "Pa = " + PuLRFD),
                (this.displayLRFDResult = displayPuLRFD)};

                  //CHECKING
                  if (PuLRFD > Load) {console.log ("Selected Beam is SAFE"); 
                  this.result = "Selected Beam is SAFE";}
                  else {console.log ("Selected Beam is UNSAFE")
                  this.result = "Selected Beam is UNSAFE"} 
              
            //ASD
                let Om = 1.67
                let PuASD = Pcr/Om
                let displayPuASD = PuASD.toFixed(3);
                console.log ("Pu is " + PuASD)
                if (PuASD) {(this.ASDResult = "Pa = " + PuASD),
                (this.displayASDResult = displayPuASD)};

                  //CHECKING
                  if (PuASD > Load) {console.log ("Selected Beam is SAFE"); 
                  this.result = "Selected Beam is SAFE";}
                  else {console.log ("Selected Beam is UNSAFE")
                  this.result = "Selected Beam is UNSAFE"}  

        
      } else {
            console.log("Fe is greater than" + Fcheck + ", so 0.0.877Fe gagamitin") 
            let Fcr = 0.877 * Fe
            console.log("let Fcr = 0.877 * Fe", "Fcr = 0.877 * " + Fe)
            console.log("Fcr is " + Fcr)
            if (Fcr) {this.FcrResult = "Fcr = " + Fcr};

                  //SOLVING PCR
                  let Pcr = Fcr*Ag;
                  console.log("Pcr = Fcr*Ag, Pcr= " + Fcr + " * " + Ag)
                  console.log ("Pcr is " + Pcr);
                  if (Pcr) {this.PcrResult = "Pcr = Pn =" + Pcr};

              //LRFD
                  let Ro = 0.9
                  let PuLRFD = Ro*Pcr
                  let displayPuLRFD = PuLRFD.toFixed(3);
                    console.log ("Pu is " + PuLRFD)
                    if (PuLRFD) {(this.LRFDResult = "Pa = " + PuLRFD),
                (this.displayLRFDResult = displayPuLRFD)};

                    //CHECKING
                    if (PuLRFD > Load) {console.log ("Selected Beam is SAFE"); 
                    this.result = "Selected Beam is SAFE";}
                    else {console.log ("Selected Beam is UNSAFE")
                    this.result = "Selected Beam is UNSAFE"} 
                
              //ASD
                  let Om = 1.67
                  let PuASD = Pcr/Om
                  let displayPuASD = PuASD.toFixed(3);
                  console.log ("Pu is " + PuASD)
                  if (PuASD) {(this.ASDResult = "Pa = " + PuASD),
                (this.displayASDResult = displayPuASD)
              };

                    //CHECKING
                    if (PuASD > Load) {console.log ("Selected Beam is SAFE"); 
                    this.result = "Selected Beam is SAFE";}
                    else {console.log ("Selected Beam is UNSAFE")
                    this.result = "Selected Beam is UNSAFE"} 
                  }

      //
      
  }
}
