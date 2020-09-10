import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestService } from '../request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-material',
  templateUrl: './editar-material.component.html',
  styleUrls: ['./editar-material.component.css']
})
export class EditarMaterialComponent implements OnInit {

  formGroup : FormGroup;
  id;
  url;
  data;

  constructor(private service:RequestService, private router:Router, private snackbar:MatSnackBar, private route:ActivatedRoute, ) { 
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('' , Validators.required),
      imagen: new FormControl('' , [Validators.required]), 
      cantidad: new FormControl('' , [Validators.required]),
    });
    this.route.params.subscribe(params=>{
      this.id=params['id']
      this.url="general/materiales/"+params['id']
      this.service.getPosts(this.url).subscribe(data=>{
        this.data=data[0]
        console.log(this.data)
        this.formGroup.reset()
        this.formGroup = new FormGroup({
          nombre: new FormControl(this.data.nombre, [Validators.required]),
          descripcion: new FormControl(this.data.descripcion , Validators.required),
          imagen: new FormControl(this.data.imagen , [Validators.required]), 
          cantidad: new FormControl(this.data.cantidad , [Validators.required]),
        });
      });
    });
    

  }

  submit(){
    let data=(this.formGroup.value)
    data.id=this.id
    if(data.nombre==null||data.nombre==''||data.descripcion==null||data.descripcion==''||data.imagen==null||data.imagen==''||data.cantidad==null||data.cantidad==''||data.cantidad<0){
      this.snackbar.open("Complete todos los campos adecuadamente","Ok",{duration:2000});
    }else{
      this.service.putMethod('admin/materiales',data).subscribe(data=>{
        console.log(data)
        this.router.navigate(["catalogo"]);
      })
    }
  }

}
