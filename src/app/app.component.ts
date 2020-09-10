import { Component } from '@angular/core';
import { RequestService } from './request.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LogoutComponent } from './logout/logout.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Almacen';

  sidenav=false;
  sesion=false;
  nombre=null;
  isMobile=false;
  
  openDialog() {
    const dialogRef = this.dialog.open(LogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  constructor(private service:RequestService, private router:Router,public dialog: MatDialog, private deviceService: DeviceDetectorService){
    this.isMobile=this.deviceService.isMobile();
    console.log(this.isMobile)

    if(!localStorage.getItem('token')){
      this.router.navigate(["/"]);
    }
    let tipo_cuenta= localStorage.getItem('tipo_cuenta')
    if(localStorage.getItem('token') && tipo_cuenta=='alumno'){
      this.service.getPosts('alumno/usuarios').subscribe(data=>{
        let response:any=data
        this.nombre=response[0].nombre
        if(this.isMobile){
          this.nombre=this.nombre.substring(0,10) 
        }
      })
      this.sesion=true;
    }else if(localStorage.getItem('token') && tipo_cuenta=='admin'){
      this.service.getPosts('admin/admin').subscribe(data=>{
        let response:any=data
        this.nombre=response[0].nombre
        if(this.isMobile){
          this.nombre=this.nombre.substring(0,10) 
        }
      })
      this.sesion=true;
    }
  }

  sideEvent(){
    this.sidenav=!this.sidenav;
  }

  nav(pestana:string){
    console.log(pestana)
    this.sidenav=!this.sidenav;
    this.router.navigate([pestana])
  }
}

