import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SharedVariable } from '../../../shared.service';
import { CompressionComponent } from '../../../pages/calculators/slenderness/compression.component';
import { beamShape } from '../../../shared.service';

@Component({
  selector: 'app-compressionbeamshapes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compressionbeamshapes.component.html',
  styleUrl: './compressionbeamshapes.component.scss'
})
export class CompressionbeamshapesComponent implements OnInit {
  constructor(private http: HttpClient, private sharedService: SharedVariable) { }

  onlyWbeams:boolean = true;
  selectedA: number | null = null;
  selectedRx: number | null = null;
  selectedType: string = '';
  selectedManualLabel: string = '';

  get areaGross() {
    // AccessAGfromsharedservice
    return this.sharedService.Ag;
  }




  allBeamShapes: beamShape[] = [];
  filteredBeamShapes: beamShape[] = [];
  searchText: string = '';
  

  /*onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchText = inputElement.value;
    this.filterBeamShapes();
  }*/
  
    

    filterBeamShapes() {
      if (this.searchText.trim() !== '') {
        this.filteredBeamShapes = this.allBeamShapes.filter(beamShape =>
          beamShape.AISC_Manual_Label.toLowerCase().includes(this.searchText.toLowerCase())
        );
      } else {
        this.filteredBeamShapes = this.allBeamShapes;
      }
    };    

    loadbeamshapesW() {
      const database = this.onlyWbeams ? 'assets/db/AISC15-imperial-Wshapes.json' : 'assets/db/AISC15-imperial.json';
      this.http.get<beamShape[]>(database).subscribe(data => {
        this.allBeamShapes = data;
        this.filteredBeamShapes = data;
        console.log("loadbeamshapesW is working");
      });
    }
    
    calcCompact(): void {
      // ITO YUN NAGNONOTIFY SA UPDATE. naol
      console.log("calcCompact is executed");
    }
    
    onBeamShapeSelected(event: Event): void {
      console.log("onBeamShapeSelected is working");
    
      const target = event.target as HTMLSelectElement;
      const selectedManualLabel = target.value;

      //Get Label//
      if (selectedManualLabel) {
        const selectedBeamShape = this.filteredBeamShapes.find(
          beamShape => beamShape.AISC_Manual_Label === selectedManualLabel);
          this.calcCompact(); //Para mag update
          
        
        if (selectedBeamShape) {
          // May function sa baba na maga handle sa selected value
          this.handleSelectedBeamShape(selectedBeamShape);
          this.sharedService.chosenBeamShape.next(selectedBeamShape);
          this.sharedService.chosenBeamShapeLabel.next(selectedBeamShape.AISC_Manual_Label);
          console.log("Shared beamshape: " + this.sharedService.chosenBeamShapeLabel.getValue())

              //Error handle
              const elemError = document.getElementById('elemError');
              if (elemError) elemError.style.display = 'none';
          
          
                  // Get Ag
                  this.sharedService.Ag.setValue(selectedBeamShape.A);
                  console.log("Area Gross (Ag) is:", selectedBeamShape.A);

                  // Get bf2tf
                  this.sharedService.bf2tf.setValue(selectedBeamShape['bf/2tf']);
                  console.log("Lamba Flange (bf2tf) is:", selectedBeamShape['bf/2tf']);

                  // Get htw
                  this.sharedService.htw.setValue(selectedBeamShape['h/tw']);
                  console.log("Lamba Web (htw) is:", selectedBeamShape['h/tw']);

                  // Get rx
                  this.sharedService.rx.setValue(selectedBeamShape.rx);
                  console.log("rX is:", selectedBeamShape.rx);

                  // Get ry
                  this.sharedService.ry.setValue(selectedBeamShape.ry);
                  console.log("rY is:", selectedBeamShape.ry);
                  
        }
      }
    }
    
    handleSelectedBeamShape(beamShape: beamShape): void {
      console.log("Selected beam shape is:", beamShape.AISC_Manual_Label);
    }
    
    onCheckboxChange() {
      this.onlyWbeams = !this.onlyWbeams;
      this.loadbeamshapesW();
    }
    


    

    ngOnInit(): void {
      this.loadbeamshapesW();
      this.filterBeamShapes();
    }
      
  }

  
