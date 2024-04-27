import { Injectable } from '@angular/core';
import { SharedVariable } from '../../../shared.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlexresultsService {
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
  Fcr: number = 0;
  Pcr: number = 0;
  PnLRFD: number = 0;
  PnASD: number = 0;
  FeCheckIsLess:number = 0;

  Centroid(){
    console.log("~~~~SOLVING FOR CENTROID~~~~~")
    let E = this.sharedService.E.value;
    let Fy = this.sharedService.Fy.value;
    let d = this.sharedService.d.value;
    let bf = this.sharedService.bf.value;
    let tf = this.sharedService.tf.value
    let bf2 = this.sharedService.bf2.value;
    let tf2 = this.sharedService.tf2.value;
    let tw = this.sharedService.tw.value;

      if (this.sharedService.isSymmetry == true) {
        let bf2 = this.sharedService.bf.value;
        let tf2 = this.sharedService.tf.value;
      } else {
        
        let bf2 = this.sharedService.bf2.value;
        let tf2 = this.sharedService.tf2.value;
        let dnot = d-tf-tf2;

        console.log(`bf = ${bf}`);
        console.log(`tf = ${tf}`);
        console.log(`bf2 = ${bf2}`);
        console.log(`tf2 = ${tf2}`);
        console.log(`dnot = ${dnot}`);
        console.log(`tw = ${tw}`);

          /* Ac = At
                (bf*tf) + x(tf) = (bf2*tf2) + [dnot-x] [tw]
                x = (bf2*tf2 - bf*tf + dnot*tw) / (tf + tw) */
      let numerator = (bf2*tf2)-(bf*tf)+(dnot*tw)
      let denominator = 2*tw
      let Xcentroid = numerator/denominator
      console.log(`(${bf2}*${tf2})-(${bf}*${tf})+(${dnot}*${tw})`);
      console.log('centroid is ' + Xcentroid)

    }

      


  }




  FeSolve() {
    console.log("~~~~FE SOLVE~~~~~")
    //4.71 * Sqrt(E/Fy)

    let E = this.sharedService.E.value;
    let Fy = this.sharedService.Fy.value;
    let maxKLr = this.sharedService.maxKLr.value;
    let Ag = this.sharedService.Ag.value;
    let Load = this.sharedService.Load.value
    
    
    let Fcheck = 4.71* (Math.sqrt(E/Fy))
    this.Fcheck = Fcheck
    console.log("4.71 * Sqrt(E/Fy) is " + Fcheck)
    console.log("E is " + E + ", Fy is " + Fy + "HAHAHAHAH")

    //Fe:
    let Fe = (Math.pow(Math.PI, 2) * E) / Math.pow(maxKLr, 2);
    if (Fe) {this.FeResult = "Fe = " + Fe};
    this.Fe = Fe
    console.log("Fe= (PI^2E)/ (MaxKLr)^2 " + Fe)
    console.log("Fe= (" + (Math.pow(Math.PI, 2)) + " * " + E + ")/ (" + maxKLr + ")^2 " + Fe)
      console.log("THEREFORE, Fe is " + Fe)
      console.log ("Max KLr is " + maxKLr)

//Solutions if Fe is > or < 4.71 chuchu
    //Ito kung Fe is less than or equal 4.71 something
    if (Fe <= Fcheck) {
            this.FeCheckIsLess = 1;
            console.log("Fe is less than" + Fcheck + ", so 0.658 gagamitin")
            let Fcr = (Math.pow(0.658, (Fy/Fe)) ) * (Fy)
            console.log("let Fcr = (0.658^ (Fe/Fy) * Fy", "Fcr = (0.658^ (" + Fe + " / " + Fy + ") * " + Fy)
            console.log("Fcr is " + Fcr)
            if (Fcr) {this.FcrResult = "Fcr = " + Fcr};
            this.Fcr = Fcr

         
            //SOLVING PCR
                  let Pcr = Fcr*Ag;
                  this.Pcr = Pcr
                  console.log("Pcr = Fcr*Ag, Pcr= " + Fcr + " * " + Ag)
                  console.log ("Pcr is " + Pcr)
                  if (Pcr) {this.PcrResult = "Pn =" + Pcr};
            
                //LRFD
                let Ro = 0.9
                let PuLRFD = Ro*Pcr
                this.PnLRFD = PuLRFD
                let displayPuLRFD = PuLRFD.toFixed(3);
                  console.log ("Pu is " + PuLRFD + "while load is " + Load)
                  if (PuLRFD) {(this.LRFDResult = "Pu = " + PuLRFD),
                (this.displayLRFDResult = displayPuLRFD)};


              
            //ASD
                let Om = 1.67
                let PuASD = Pcr/Om
                this.PnASD = PuASD
                let displayPuASD = PuASD.toFixed(3);
                console.log ("Pa is " + PuASD)
                if (PuASD) {(this.ASDResult = "Pa = " + PuASD),
                (this.displayASDResult = displayPuASD)};



       //Ito naman kung greater than: 
      } else {
            this.FeCheckIsLess = 2;
            console.log("Fe is greater than" + Fcheck + ", so 0.0.877Fe gagamitin") 
            let Fcr = 0.877 * Fe
            console.log("let Fcr = 0.877 * Fe", "Fcr = 0.877 * " + Fe)
            console.log("Fcr is " + Fcr)
            if (Fcr) {this.FcrResult = "Fcr = " + Fcr};

                  //SOLVING PCR
                  let Pcr = Fcr*Ag;
                  this.Pcr = Pcr
                  console.log("Pcr = Fcr*Ag, Pcr= " + Fcr + " * " + Ag)
                  console.log ("Pcr is " + Pcr);
                  if (Pcr) {this.PcrResult = "Pn =" + Pcr};

              //LRFD
                  let Ro = 0.9
                  let PuLRFD = Ro*Pcr
                  this.PnLRFD = PuLRFD
                  let displayPuLRFD = PuLRFD.toFixed(3);
                    console.log ("Pu is " + PuLRFD + "while load is " + Load)
                    if (PuLRFD) {(this.LRFDResult = "Pu = " + PuLRFD),
                (this.displayLRFDResult = displayPuLRFD)};

                
              //ASD
                  let Om = 1.67
                  let PuASD = Pcr/Om
                  this.PnASD = PuASD
                  let displayPuASD = PuASD.toFixed(3);
                  console.log ("Pa is " + PuASD + "while load is " + Load)
                  if (PuASD) {(this.ASDResult = "Pa = " + PuASD),
                (this.displayASDResult = displayPuASD)
              };

                  /*  //CHECKING
                    if (PuASD > Load) {console.log ("Selected Beam is SAFE"); 
                    this.result = "Selected Beam is SAFE";}
                    else {console.log ("Selected Beam is UNSAFE")
                    this.result = "Selected Beam is UNSAFE"} */
                  }

      //
      
  }

}


