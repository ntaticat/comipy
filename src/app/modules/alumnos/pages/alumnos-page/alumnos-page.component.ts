import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ComipyApiService } from '../../../../services/comipy-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { IAlumno } from '../../../../data/interfaces/docentes.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';

enum filterColumnsEnum {
  nombre_completo = 'nombre_completo',
  folio = 'folio',
}

@Component({
  selector: 'app-alumnos-page',
  templateUrl: './alumnos-page.component.html',
  styleUrl: './alumnos-page.component.scss',
})
export class AlumnosPageComponent implements OnInit, AfterViewInit, OnChanges {
  alumnos: IAlumno[] = [];
  selectedColumn: filterColumnsEnum = filterColumnsEnum.nombre_completo;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selection = new SelectionModel<IAlumno>(true, []);

  displayedColumns: string[] = [
    'select',
    'alumno_id',
    'folio',
    'nombre_completo',
    'nombres',
    'primer_apellido',
    'segundo_apellido',
    'activo',
    'turno_id',
  ];

  filterColumns = [
    {
      value: filterColumnsEnum.nombre_completo,
      viewValue: 'Nombre Completo',
    },
    {
      value: filterColumnsEnum.folio,
      viewValue: 'Folio',
    },
  ];

  dataSource = new MatTableDataSource(this.alumnos);

  constructor(private comipyApiService: ComipyApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.sortData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.comipyApiService.getAlumnos().subscribe((alumnos) => {
      this.alumnos = this.procesarDatos(alumnos);

      this.dataSource.data = this.alumnos;
    });
  }

  sortData() {
    this.dataSource.sortData = (data, sort: MatSort) => {
      const isAsc = sort.direction === 'asc';
      return data.sort((a, b) => {
        const aIsSelected = this.selection.isSelected(a);
        const bIsSelected = this.selection.isSelected(b);
        if (aIsSelected && !bIsSelected) {
          return -1;
        } else if (!aIsSelected && bIsSelected) {
          return 1;
        } else {
          return this.compare(a.alumno_id, b.alumno_id, isAsc);
        }
      });
    };
  }

  compare(a: number, b: number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  applyFilter(e: Event) {
    const filterValue = (e.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = (data: IAlumno, filter: string) => {
      const textToSearch =
        data[this.selectedColumn].toString().toLowerCase() || '';
      return textToSearch.includes(filter.toLowerCase());
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterData(e: any) {
    this.dataSource.filter = 'folio';
  }

  onSelectChange(e: any) {}

  procesarDatos(alumnos: IAlumno[]): IAlumno[] {
    return alumnos.map((usuario) => {
      return {
        nombres: usuario.nombres || 'No disponible',
        primer_apellido: usuario.primer_apellido || 'No disponible',
        segundo_apellido: usuario.segundo_apellido || 'No disponible',
        alumno_id: usuario.alumno_id || 0,
        nombre_completo: usuario.nombre_completo || 'No disponible',
        turno_id: usuario.turno_id || 0,
        folio: usuario.folio || 'No disponible',
        activo: usuario.activo || false,
      };
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IAlumno): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.alumno_id + 1
    }`;
  }
}
