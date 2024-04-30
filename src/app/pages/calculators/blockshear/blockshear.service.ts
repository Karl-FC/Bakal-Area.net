import { Injectable } from '@angular/core';
import { SharedVariable, beamShape } from '../../../shared.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { min } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockshearService {
  constructor(public sharedService: SharedVariable  ) { }

  SteelShapeServe: number = 0
  Fy: number = 0;
  Fu: number = 0;
  Ag: number = 0;
  b: number = 0;
  thiccness: number = 0;
  bf: number = 0; // depth minus flanges
  tf: number = 0;
  tw: number = 0;
  d: number = 0;
  
  db: number = 0; //diameter of bolt
  n: number = 0;
  dh: number = 0; //diameter of hole (YUN LAHAT LAHAT NA)
  
  isholePunch :boolean= true;  //Punching standard hole (1/16)
  hPunch: number = 0;
  isholeDmg :boolean= true;    //Damaged hole edge (1/16)
  hDamage: number = 0;
  holeResults: number = 0;

  SumSGT: number = 0;
  denominatorngHoles:number = 0;

  U: number = 0;
  An: number = 0;
  Ae: number = 0;
  Ubs:number = 1;

  useFlange: number = 0;
  LengthShear: FormControl = new FormControl(null);
  LengthTension: FormControl = new FormControl(null);
  holeShear: FormControl = new FormControl(null);
  holeTension: FormControl = new FormControl(null);

  Agv: number = 0;
  Agt: number = 0;
  Anv: number = 0;
  Ant: number = 0;
    Fv: number = 0;
    F1v: number = 0;
    F2v: number = 0;
    Ft: number = 0;
    Tn: number = 0;
    Tu: number = 0;
    Ta: number = 0;
  AnResults: string = '';
  AeResults: string = '';



  yieldLRFD: number = 0;
  fractureLRFD: number = 0;
  blockShearLRFD: number = 0;

  yieldLRFDResults: string = '';
  fractureLRFDResults: string = '';
  blockShearLRFDResults: string = '';

  yieldASD: number = 0;
  fractureASD: number = 0;
  blockShearASD: number = 0;

  yieldASDResults: string = '';
  fractureASDResults: string = '';
  blockShearASDResults: string = '';



  MnResults: string = '';
  LRFDResult: string = '';
  ASDResult: string = '';
  
  displayLRFDResult: number = 0;
  displayASDResult: number = 0;
  
  ChooseThickness(notIShape: number){
      this.useFlange = notIShape
  }


  TensileStrength(){
    //Get them variables
      this.Fy = this.sharedService.Fyield.value
      this.Fu = this.sharedService.Fu.value
      this.Ag = this.sharedService.Ag.value
      this.b = this.sharedService.b.value

      if (this.useFlange) {
          if (this.useFlange==1) {
            this.thiccness = this.sharedService.tf.value
          } else if (this.useFlange==2) {
            this.thiccness = this.sharedService.tw.value}
          }  else {this.thiccness = this.sharedService.t.value}

      
      this.d = this.sharedService.d.value

      this.bf = this.sharedService.bf.value
      this.tf = this.sharedService.tf.value
      this.tw = this.sharedService.tw.value

      this.U = this.sharedService.shearLagFactor
      this.db = this.sharedService.boltDiameter.value
      this.n = this.sharedService.boltAmount.value

      this.SumSGT = this.sharedService.totalSgt


//SOLVE NAAAAAAAAAAAAAAAAAA
let Fy = Number(this.Fy)
let Fu = Number(this.Fu)
let Ag = Number(this.Ag)
let b = Number(this.b)
let t = Number(this.thiccness)
let d = Number(this.d)

let bf = Number(this.bf)
let tf = Number(this.tf)
let tw = Number(this.tw)

let U = Number(this.U)
let db = Number(this.db)
let n = Number(this.n)

    //Net Area, An
          if (this.isholePunch) {this.hPunch = 1/16} else {this.hPunch = 0}
          if (this.isholeDmg) {this.hDamage = 1/16} else {this.hDamage = 0}
                this.holeResults = 1/(this.hPunch+this.hDamage)
      //An = Ag-n (db + 1/8)t + SumSGT
      let theBolts = n*(db+this.hPunch+this.hDamage)*t;       
      let staggeredBolt = Number(this.SumSGT);


      let Aholes = Number(theBolts);        
      let An = (Ag-Aholes)+staggeredBolt;
      this.An = Number(An);
      this.AnResults = `An = ${this.An}`

    //Effective Net Area, Ae
      this.Ae = U*An;
      this.AeResults = `Ae = ${this.Ae}`;
      console.log(`n: ${n}\n db: ${db}\n this.hPunch: ${this.hPunch}\n this.hDamage: ${this.hDamage}\n theBolts: ${theBolts}\n this.SumSGT: ${this.SumSGT}\n staggeredBolt: ${staggeredBolt}\n Aholes: ${Aholes}\n Ag: ${Ag}\n An: ${An}\n this.An: ${this.An}\n U: ${U}\n this.Ae: ${this.Ae}`);


  

//~~~~~~~~~LRFD

      //Yielding
          this.yieldLRFD = 0.9*Fy*Ag
          this.yieldLRFDResults = `Tu = ${this.yieldLRFD}`
            console.log(`Fy: ${Fy}\n Ag: ${Ag}\n yieldLRFD: ${this.yieldLRFD}`)

      //Fracture
          let Ae = this.Ae
          this.fractureLRFD = 0.75*Ae*Fu
          this.fractureLRFDResults = `Tu = ${this.fractureLRFD}`

      //Block Shear
          let holeTension = Number(this.holeTension.value)
          let holeShear = Number(this.holeShear.value)
          this.Agv = this.LengthShear.value*t
          this.Agt = this.LengthTension.value*t

          let Agv = this.Agv
          let Agt = this.Agt

          //Anv
            this.Anv = Agv-((holeShear*(db+this.hPunch+this.hDamage)*t)+staggeredBolt) //Area net ng Shear
            this.Ant = Agt-((holeTension*(db+this.hPunch+this.hDamage)*t)+staggeredBolt) //Area net ng Tension

                //Shear Resistance
                        //F1v: 0.6FuAnv, F2v: 0.6FyAgv
                            this.F1v = 0.6*Fu*this.Anv
                            this.F2v = 0.6*Fy*Agv
                            if (this.F1v && this.F2v) {this.Fv = Math.min(this.F1v, this.F2v)}; //Fv is yun minimum value
                //Tension Resistance
                      let Ubs = this.Ubs
                      this.Ft = Ubs*Fu*this.Ant

                      
            //Rupture
                let TnLRFD = this.Fv + this.Ft
                this.Tu = 0.75*TnLRFD
                this.blockShearLRFDResults = `Tu = ${this.Tu}`


            //CARD:
                if (this.blockShearLRFDResults && this.yieldASD && this.fractureASD)
                  {this.displayLRFDResult = Math.min(Number(this.yieldLRFD), 
                    Number(this.fractureLRFD), 
                    Number(this.Tu))}
                else if (this.yieldLRFD && this.fractureLRFD) 
                    {this.displayLRFDResult = Math.min(Number(this.yieldLRFD), 
                    Number(this.fractureLRFD))};
            console.log(`yield LRFD: ${this.yieldLRFD}, fracture LRFD: ${this.fractureLRFD}, block shear: ${this.Tu}`)


                
//~~~~~~~~~ASD~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //Yielding
      this.yieldASD = (Fy*Ag)/1.67
      this.yieldASDResults = `Ta = ${this.yieldASD}`
        console.log(`Fy: ${Fy}\n Ag: ${Ag}\n yieldASD: ${this.yieldASD}`)

  //Fracture
      this.fractureASD = (Ae*Fu)/2
      this.fractureASDResults = `Ta = ${this.fractureASD}`

  //Block Shear
      //Rupture
      let TnASD = this.Fv + this.Ft
      this.Ta = TnASD/2
      this.blockShearASDResults = `Ta = ${this.Ta}`

      
    
      //CARD:
      if (this.blockShearASDResults && this.yieldASD && this.fractureASD) {
        {this.displayASDResult = Math.min(Number(this.yieldASD), 
          Number(this.fractureASD), 
          Number(this.Ta))};
      } else if (this.yieldASD && this.fractureASD) 
        {this.displayASDResult = Math.min(Number(this.yieldASD), 
          Number(this.fractureASD))};  
          console.log(`yield ASD: ${this.yieldASD}, fracture ASD: ${this.fractureASD}, block shear: ${this.Ta}`)

















    
   /*     

        //LRFD
        this.Ro = 0.9
        this.MuLRFD = Ro*Mn
        this.MuLRFD = MuLRFD
       

      
    //ASD
        this.Om = 1.67
        this.MaASD = (Mn)/Om
        this.MaASD = MaASD
        this.displayMaASD = MaASD.toFixed(3);
        if (MaASD) {(this.ASDResult = "Ma = " + MaASD),
      (this.displayASDResult = displayMaASD)
*/
  }




 }

      




