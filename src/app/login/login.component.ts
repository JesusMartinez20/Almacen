import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl  } from '@angular/forms';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  url="login"
  primer_login:any

  formGroup : FormGroup;

  constructor(private service:RequestService, private router:Router, private snackbar:MatSnackBar) { 
  }

  ngOnInit(): void {
    this.primer_login=localStorage.getItem('primer_login')
    let token=localStorage.getItem('token')
    let tipo_cuenta=localStorage.getItem('tipo_cuenta')
    console.log('tipo_cuenta')
    if((this.primer_login=='true' && token!=null)||(token!=null&&tipo_cuenta=='admin')){
      this.router.navigate(["catalogo"]);
    }else if(this.primer_login==false){
      this.router.navigate(["contrasena"]);
    }
    this.formGroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', Validators.required)
    }); 
  }

  submit(){
    let data=(this.formGroup.value)
    
    this.service.login(data.id,data.contrasena).subscribe(data => {
      console.log(data)
      let response:any
      response=data
      if(response.token!=undefined){
        localStorage.setItem('token',response.token)
        localStorage.setItem('tipo_cuenta',response.tipo_cuenta)
        localStorage.setItem('primer_login',response.primer_login)
        this.primer_login=response.primer_login
        let tipo_cuenta=localStorage.getItem('tipo_cuenta')
        let token=response.token
        if((this.primer_login==true && token!=null)||(token!=null&&tipo_cuenta=='admin')){
          window.location.reload();
          this.router.navigate(["catalogo"]);
        }else if(this.primer_login==false){
          this.router.navigate(["contrasena"]);
        }
      }else{
        this.snackbar.open("Registo o contraseña incorrectos","Ok",{duration:2000});
      }
    });
  }
}
