import { Component, Renderer2, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CompDesignService } from '../../COMPRESSION/comp-design/comp-design.service';
import { CompdesignLoadsComponent } from '../../calculators/compdesign-loads/compdesign-loads.component';
import { CompdesignTableService, BeamShape } from './compdesign-table.service';

import { Sort,MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-compdesign-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSortModule],
  templateUrl: './compdesign-table.component.html',
  styleUrl: './compdesign-table.component.scss'
})
export class CompdesignTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>; //Yun para sa sorting

  beamShapes$ = this.updater.beamShapes$;
  beamFilters = new FormControl('');

  constructor(private updater: CompdesignTableService) {
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
        case 'PuLoad':
          return compare(a.PuLoad, b.PuLoad, isAsc);
        case 'PnLRFD':
          return compare(a.PnLRFD, b.PnLRFD, isAsc);
        case 'LRFDstatus':
          return compare(a.LRFDstatus, b.LRFDstatus, isAsc);
        case 'PaLoad':
          return compare(a.PaLoad, b.PaLoad, isAsc);
        case 'PnASD':
          return compare(a.PnASD, b.PnASD, isAsc);
        case 'LRFDstatus':
          return compare(a.LRFDstatus, b.LRFDstatus, isAsc);
        case 'ASDstatus':
          return compare(a.ASDstatus, b.ASDstatus, isAsc);
        case 'Fcondition':
          return compare(a.Fcondition, b.Fcondition, isAsc);
        case 'Wcondition':
          return compare(a.Wcondition, b.Wcondition, isAsc);
        case 'A':
          return compare(a.A, b.A, isAsc);
        case 'bf/2tf':
          return compare(a['bf/2tf'], b['bf/2tf'], isAsc);
        case 'h/tw':
          return compare(a['h/tw'], b['h/tw'], isAsc);
        case 'rx':
          return compare(a.rx, b.rx, isAsc);
        case 'ry':
          return compare(a.ry, b.ry, isAsc);
        case 'maxkLr':
          return compare(a.maxkLr, b.maxkLr, isAsc);
        case 'Fe':
          return compare(a.Fe, b.Fe, isAsc);
        case 'Fcr':
          return compare(a.Fcr, b.Fcr, isAsc);
        case 'Pcr':
          return compare(a.Pcr, b.Pcr, isAsc);
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


