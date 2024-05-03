import { Component, Renderer2, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CompDesignService } from '../../COMPRESSION/comp-design/comp-design.service';
import { CompdesignLoadsComponent } from '../../calculators/compdesign-loads/compdesign-loads.component';
import { TendesignTableService, BeamShape } from './tendesign-table.service';

import { Sort,MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-tendesign-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSortModule, FormsModule],
  templateUrl: './tendesign-table.component.html',
  styleUrl: './tendesign-table.component.scss'

})


export class TendesignTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>; //Yun para sa sorting

  shapeChoose: number = 1
  beamShapes$ = this.updater.beamShapes$;
  beamFilters = new FormControl('');

  constructor(public updater: TendesignTableService, 
    public sharedService: SharedVariable) {
            this.updater.updateTable$.subscribe(() => {
              this.updater.loadTable();
              console.log("updater worked on designtablecomponent");
            });
          }

  onFilterChange() {
    let beamFilters = Number(this.beamFilters.value);
    this.updater.beamFilter.next(beamFilters);
    if (this.beamFilters.value !== null) {
        this.updater.setBeamFilter(Number(this.beamFilters.value));
    }
    // or assign a default value if this.beamFilters.value is null
    else {
        this.updater.setBeamFilter(0); // replace 0 with your default value
    }
}

  ngOnInit() {
    this.updater.loadTable();
    
    this.updater.beamShapes$.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
  });
  };

  get beamShapes() {
    return this.updater.beamShapes$;
  }

  sortData(sort: Sort) {
    const data = this.updater._beamShapes.getValue().slice();
    if (!sort.active || sort.direction === '') {
        return;
    }
  
    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'AISC_Manual_Label':
              return compare(a.AISC_Manual_Label, b.AISC_Manual_Label, isAsc);
        case 'W':
              return compare(a.W, b.W, isAsc);
        case 'A':
          return compare(a.A, b.A, isAsc);
        case 'PnLRFD':
          return compare(a.PnLRFD, b.PnLRFD, isAsc);
        case 'ry':
          return compare(a.ry, b.ry, isAsc);
        case 'rmin':
          return compare(a.rmin, b.rmin, isAsc);
        case 'Aholes':
          return compare(a.Aholes, b.Aholes, isAsc);
        case 'AgLRFD':
          return compare(a.AgLRFD, b.AgLRFD, isAsc);
        case 'LRFDstatus':
          return compare(a.LRFDstatus, b.LRFDstatus, isAsc);
        case 'AgASD':
          return compare(a.AgASD, b.AgASD, isAsc);
        case 'ASDstatus':
          return compare(a.ASDstatus, b.ASDstatus, isAsc);
        case 't':
          return compare(a.t, b.t, isAsc);
        case 'tf':
          return compare(a.tf, b.tf, isAsc);
        case 'tw':
          return compare(a.tw, b.tw, isAsc);
        default:
          return 0;
      }
    });
    this.updater._beamShapes.next(sortedData);
  }

}
  
function compare(a: number | string, b: number | string, isAsc: boolean) {
  let numA = Number(a);
  let numB = Number(b);

  if (!isNaN(numA) && !isNaN(numB)) {
    // Both a and b are valid numbers or can be converted to valid numbers
    return (numA < numB ? -1 : 1) * (isAsc ? 1 : -1);
  } else {
    // Either a or b is a string that can't be converted to a number
    return String(a).localeCompare(String(b)) * (isAsc ? 1 : -1);
  }
}


