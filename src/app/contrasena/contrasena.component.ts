import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl  } from '@angular/forms';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.component.html',
  styleUrls: ['./contrasena.component.css']
})
export class ContrasenaComponent implements OnInit {

  formGroup : FormGroup;

  constructor(private service:RequestService, private router:Router, private snackbar:MatSnackBar) { 
  }

  ngOnInit(): void {
    // this.primer_login=localStorage.getItem('primer_login')
    // if(this.primer_login==true && localStorage.getItem('token')){
    //   this.router.navigate(["catalogo"]);
    // }else if(this.primer_login==false){
    //   this.router.navigate(["contrasena"]);
    // }
    this.formGroup = new FormGroup({
      contrasena: new FormControl('', [Validators.required]),
      confirmarContrasena: new FormControl('', Validators.required)
    }); 
  }

  submit(){
    let data=(this.formGroup.value)
    if(data.contrasena===data.confirmarContrasena){
      this.service.putMethod('alumno/usuarios',data).subscribe(data => {
        let response:any
        response=data 
        localStorage.setItem('primer_login','true')
        this.router.navigate(["catalogo"]);
      });
  
    }else{
      this.snackbar.open("La contraseñas deben de coincidir","Ok",{duration:2000});
    }
    
    
  }
}
