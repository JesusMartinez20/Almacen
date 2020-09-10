import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  solicitudesColumnas: string[] 
  solicitudesPasadas;
  solicitudesPendientes;
  solicitudesActivas
  cuenta

  constructor(private service:RequestService, private router:Router, private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    if(localStorage.getItem('tipo_cuenta')=='alumno'){
      this.cuenta='alumno'

      this.solicitudesColumnas= ['Equipo', 'Fecha de prestamo', 'Fecha de entrega', 'Estatus'];

      this.service.getPosts('alumno/solicitudesPasadasAlumno').subscribe(data=>{
        this.solicitudesPasadas=data
      })
      this.service.getPosts('alumno/solicitudesAlumno').subscribe(data=>{
        this.solicitudesActivas=data
      })
      this.service.getPosts('alumno/solicitudesPendientesAlumno').subscribe(data=>{
        this.solicitudesPendientes=data
      })
    }else if(localStorage.getItem('tipo_cuenta')=='admin'){
      this.cuenta='admin'

      this.solicitudesColumnas= ['Registro','Nombre','Equipo', 'Fecha de prestamo', 'Fecha de entrega', 'Estatus'];

      this.service.getPosts('admin/solicitudesPasadasAdmin').subscribe(data=>{
        this.solicitudesPasadas=data
      })
      this.service.getPosts('admin/solicitudesAdmin').subscribe(data=>{
        this.solicitudesActivas=data
      })
      this.service.getPosts('admin/solicitudesPendientesAdmin').subscribe(data=>{
        this.solicitudesPendientes=data 
      })
    }

  }

}
