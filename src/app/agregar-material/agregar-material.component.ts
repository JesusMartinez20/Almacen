import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-material',
  templateUrl: './agregar-material.component.html',
  styleUrls: ['./agregar-material.component.css']
})
export class AgregarMaterialComponent implements OnInit {

  formGroup : FormGroup;

  constructor(private service:RequestService, private router:Router, private snackbar:MatSnackBar) { 
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', Validators.required),
      imagen: new FormControl('', [Validators.required]), 
      cantidad: new FormControl('', [Validators.required]),
    }); 
  }

  submit(){
    let data=(this.formGroup.value)
    if(data.nombre==null||data.nombre==''||data.descripcion==null||data.descripcion==''||data.imagen==null||data.imagen==''||data.cantidad==null||data.cantidad==''||data.cantidad<0){
      this.snackbar.open("Complete todos los campos adecuadamente","Ok",{duration:2000});
    }else{
      this.service.postMethod('admin/materiales',data).subscribe(data=>{
        console.log(data)
        this.router.navigate(["catalogo"]);
      })
    }
  }
}
