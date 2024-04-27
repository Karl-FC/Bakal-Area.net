import { Injectable } from '@angular/core';
import { SharedVariable, beamShape } from '../../../shared.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlexresultsService {
  constructor(public sharedService: SharedVariable  ) { }

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

  areaTop: number = 0;
  areaBot: number = 0;
  PNA: number = 0;
  PNAfrombelow: number = 0;
  Area: number = 0;
  dnot: number = 0; // depth minus flanges
  Z: number = 0;
  Mp: number = 0;
  MuLRFD: number = 0;
  MaASD: number = 0;

  PNAresults: string = '';
  ZResults: string = '';
  MpResults: string = '';

  Centroid(){
    console.log("~~~~SOLVING FOR CENTROID~~~~~")
    let E = this.sharedService.E.value;
    let Fy = this.sharedService.Fyield.value;
    let d = this.sharedService.d.value;
    let bf = this.sharedService.bf.value;
    let tf = this.sharedService.tf.value
    let bf2 = this.sharedService.bf2.value;
    let tf2 = this.sharedService.tf2.value;
    let tw = this.sharedService.tw.value;

      if (this.sharedService.isSymmetry == true) {
        let bf2 = this.sharedService.bf.value;
        let tf2 = this.sharedService.tf.value;

        this.dnot = d-(2*tf);
        this.PNA = this.dnot/2
        this.PNAfrombelow = this.PNA
        this.areaTop = this.sharedService.Ag.value;
        this.areaBot = this.areaTop


                    //Plastic Modulus, Zx
                        //Zx = AcYc + AtYt
                      let leftSide = (bf*tf)*(this.PNA+ (tf/2)) + (this.PNA*(tw))*(this.PNA/2)
                          console.log('leftSide is ' + leftSide)
                          console.log('leftSide = (' + bf + '*' + tf + ')*(' + this.PNA + '+ (' + tf + '/2)) + (' + this.PNA + '*(' + tf + '))*(' + this.PNA + '/2) = ' + leftSide);
                      let Zassumed = 2*leftSide
                          this.Z = Zassumed
                          this.ZResults = 'Zx = ' + Zassumed
                          console.log(this.ZResults)




        } else 

          {         let bf2 = this.sharedService.bf2.value;
                    let tf2 = this.sharedService.tf2.value;
                    let dnot = d-tf-tf2;
                    this.dnot = dnot

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
                  let PNA = numerator/denominator
                      console.log(`(${bf2}*${tf2})-(${bf}*${tf})+(${dnot}*${tw})`);
                      console.log('PNA is ' + PNA)
                      this.PNA = PNA
                      this.PNAresults = "x = " + PNA
                  let PNAfrombelow = dnot-PNA
                      console.log('PNA from below is ' + PNAfrombelow)
                      this.PNAfrombelow = PNAfrombelow


                      //Area
                      this.areaTop = (bf*tf) + (this.PNA*tw)
                      this.areaBot = (bf2*tf2) + ((this.dnot-this.PNA)*(tw))

                      console.log('areaTop is ' + this.areaTop)
                      console.log('areaBot is ' + this.areaBot)
                      this.Area = this.areaTop + this.areaBot
                        console.log('Area is ' + this.areaBot)


                      //Plastic Modulus, Zx
                          //Zx = AcYc + AtYt
                        let leftSide = (bf*tf)*(this.PNA+ (tf/2)) + (this.PNA*(tf))*(this.PNA/2)
                          console.log('leftSide is ' + leftSide)
                        let rightSide = (bf2*tf2)*(this.PNAfrombelow + (tf2/2)) + (tw*this.PNAfrombelow)*(this.PNAfrombelow/2)
                        console.log('rightSide is ' + rightSide)
                            console.log('leftSide = (' + bf + '*' + tf + ')*(' + this.PNA + '+ (' + tf + '/2)) + (' + this.PNA + '*(' + tf + '))*(' + this.PNA + '/2) = ' + leftSide);
                            console.log('rightSide = (' + bf2 + '*' + tf2 + ')*(' + this.PNAfrombelow + ' + (' + tf2 + '/2)) + (' + tw + '*' + this.PNAfrombelow + ')*(' + this.PNAfrombelow + '/2) = ' + rightSide);
                        let Zassumed = leftSide + rightSide
                            this.Z = Zassumed
                            this.ZResults = 'Zx = ' + Zassumed
                            console.log(this.ZResults)
                    
          
        }
        


        //Plastic Moment, Mp
        let Mp = Fy*this.Z
        console.log('(' + Fy + ')* ' + this.Z)
        this.Mp = Mp
        console.log('Mp = ' + Mp)
        this.MpResults = 'Mp = ' + this.Mp;
        let unit = 1/12

        //LRFD
        let Ro = 0.9
        let MuLRFD = Ro*Mp*unit
        this.MuLRFD = MuLRFD
        let displayMuLRFD = MuLRFD.toFixed(3);
          if (MuLRFD) {(this.LRFDResult = "Mu = " + MuLRFD),
      (this.displayLRFDResult = displayMuLRFD)};

      
    //ASD
        let Om = 1.67
        let MaASD = (Mp*unit)/Om
        this.MaASD = MaASD
        let displayMaASD = MaASD.toFixed(3);
        if (MaASD) {(this.ASDResult = "Ma = " + MaASD),
      (this.displayASDResult = displayMaASD)

  }




 }

      


}


