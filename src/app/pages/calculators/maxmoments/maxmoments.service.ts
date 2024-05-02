import { Injectable } from '@angular/core';
import { SharedVariable, beamShape } from '../../../shared.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MaxMomentsService {
  constructor(public sharedService: SharedVariable  ) { }
  Fy: number = 0;
  E: number = 0;
  Vn: number = 0;
  Aw: number = 0;
  Cv: number = 0;
  kv: number = 0;
  Phi: number = 0.9;
  Omega: number = 1.67;
  Vu: number = 0;
  Va: number = 0;

  check1: number = 0;
  check2: number = 0;
  check3: number = 0;

  CvResults: string = '';
  LRFDResult: string = '';
  ASDResult: string = '';


  


  Shears(){
    console.log("~~~~SOLVING FOR Cv~~~~~")
    this.Fy = this.sharedService.Fyield.value;
    this.E = this.sharedService.E.value;

    let Fy = this.sharedService.Fyield.value;
    let E = this.E;
    let d = this.sharedService.d.value;
    let tw = this.sharedService.tw.value;
    let htw = this.sharedService.htw.value
 
    let eq1 = (Math.sqrt((E/Fy)))*2.24; //Equation 1: (2.24 sqrt( E/Fy))
        this.check1 = eq1
    let eq2 = (Math.sqrt(((this.kv*E)/Fy)))*1.1;
        this.check2 = eq2
    let eq3 = (Math.sqrt(((this.kv*E)/Fy)))*1.37;
        this.check3 = eq3

      if (htw <= eq1) {
        this.Cv = 1
        this.Phi = 1
        this.Omega = 1.5
      } else {
            this.Phi = 0.9
            this.Omega = 1.67
                  if (htw < 260) {this.kv = 5}
                  if (htw <= eq2) {this.Cv = 1}
                      else if (htw > eq2 && htw < eq3) {this.Cv = eq2/htw}
                      else if (htw > eq3) {
                                          let numerator = 1.51*E*this.kv
                                          let denominator = (Fy)*(Math.pow(htw,2))
                                            this.Cv = numerator/denominator}
      }

      this.CvResults = 'Cv = ' + this.Cv;
      console.log(`htw: ${htw}\n` +
            `eq1: ${eq1}\n` +
            `eq2: ${eq2}\n` +
            `eq3: ${eq3}\n` +
            `E: ${E}\n` +
            `Fy: ${Fy}\n` +
            `this.Cv: ${this.Cv}\n` +
            `this.Phi: ${this.Phi}\n` +
            `this.Omega: ${this.Omega}\n` +
            `this.kv: ${this.kv}`);

      //Solving Vn
            this.Aw = d*tw
              let Aw = this.Aw
              let Cv = this.Cv
            this.Vn = 0.6*Fy*Aw*Cv
                    console.log(`Vn = 0.6FyAwCv.......... ${this.Vn} = 0.6(${Fy})(${Aw})(${Cv})`)
      
          //LRFD
              this.Vu = this.Phi*this.Vn
              this.LRFDResult = this.Vu.toFixed(3);

          //ASD
              this.Va = this.Vn/this.Omega
              this.ASDResult = this.Va.toFixed(3);

              console.log(`Vu = ${this.Vu}, Va = ${this.Va}`)
  }

      


}


