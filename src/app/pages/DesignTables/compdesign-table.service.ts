import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompDesignComponent } from '../COMPRESSION/comp-design/comp-design.component';
import { CompDesignService } from '../COMPRESSION/comp-design/comp-design.service';
import { CompdesignLoadsComponent } from '../calculators/compdesign-loads/compdesign-loads.component';
import { CompdesignTableComponent } from './compdesign-table/compdesign-table.component';
import { BehaviorSubject } from 'rxjs';

interface BeamShape {
  AISC_Manual_Label: string;
  Fy: number;
  A: number;
  rx: number;
  ry: number;
  'bf/2tf': number;
  'h/tw': number;
  PuLoad: number;
  PaLoad: number;
  Fcondition: string;
  Wcondition: string;
  LRFDstatus: string;
  ASDstatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompdesignTableService {
  private _beamShapes = new BehaviorSubject<BeamShape[]>([]);
  beamShapes$ = this._beamShapes.asObservable();
  onlyWbeams:boolean = true;
  
  constructor(private sharedElement: CompDesignService,
     private http: HttpClient) {}

    calculateStatus(beamShape: BeamShape) {
      // Get values from sharedElements
      let kL = this.sharedElement.chosenkL.value
            console.log("used kL: " + kL)
      let KFactor = this.sharedElement.chosenKFactor.value
            console.log("used KFactor: " + KFactor)
      let L = this.sharedElement.chosenElemLength.value
             console.log("used L: " + L)
      let element = this.sharedElement.chosenElem.value
             console.log("used elmenet: " + element)
      let DL = this.sharedElement.DL.value;
             console.log("used DL: " + DL)
      let LL = this.sharedElement.LL.value;
             console.log("used LL: " + LL)


      //Mga variables sa pagsolve sa analysis
      let E = this.sharedElement.E.value;
                   console.log("used E: " + E)
      let Fy = this.sharedElement.Fy.value;
                    console.log("used Fy: " + Fy)
      let maxKLr = this.sharedElement.maxKLr.value;
                   console.log("used maxKLr: " + maxKLr)
      let Ag = beamShape.A
                   console.log("used Ag: " + Ag)

      let PuLoad = 1.2 * DL + 1.6 * LL; // replace DL and LL with their actual values
      let PaLoad = DL + LL

      // ANALYSIS
      let Fcheck = 4.71 * Math.sqrt(E / Fy);
      let Fe = (Math.pow(Math.PI, 2) * E) / Math.pow(maxKLr, 2);
      let Fcr = Fe <= Fcheck ? Math.pow(0.658, Fy / Fe) * Fy : 0.877 * Fe;
      let Pcr = Fcr * Ag;
      let PuLRFD = 0.9 * Pcr;
      let PuASD = Pcr / 1.67;

      //status
      let LRFDstatus = PuLRFD > PuLoad ? 'SAFE' : 'UNSAFE'; // replace Load with its actual value
      let ASDstatus = PuASD > PaLoad ? 'SAFE' : 'UNSAFE'; // replace Load with its actual value
      

      // Para makuha yun values
      return { LRFDstatus, ASDstatus, PuLoad, PaLoad };
    }


    loadTable() {
      const database = this.onlyWbeams ? 'assets/db/AISC15-imperial-Wshapes.json' : 'assets/db/AISC15-imperial.json';
      this.http.get<BeamShape[]>(database).subscribe(data => {
        // For each beam shape, calculate the status and add it to the beam shape
        data.forEach(beamShape => {
          let status = this.calculateStatus(beamShape);
                console.log("~~BEAMSHAPE: " + beamShape.AISC_Manual_Label + "~~~~~")
          beamShape.LRFDstatus = status.LRFDstatus;
          beamShape.ASDstatus = status.ASDstatus;
          beamShape.PuLoad = status.PuLoad;
          beamShape.PaLoad = status.PaLoad;
        });
    
        // Update the BehaviorSubject with the new data
        this._beamShapes.next(data);
      });
    }
    

    private _updateTable = new Subject<void>();
    updateTable$ = this._updateTable.asObservable();

  triggerUpdate() {
    this._updateTable.next();
  }

}
