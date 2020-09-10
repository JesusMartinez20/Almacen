import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.css']
})
export class SolicitarComponent implements OnInit {

  formGroup:FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service:RequestService, private router:Router, private snackbar:MatSnackBar, public dialogRef: MatDialogRef<SolicitarComponent>) {
    console.log(this.data)
   }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      fecha_entrega: new FormControl('', [Validators.required]),
      fecha_devolucion: new FormControl('', Validators.required)
    }); 
  }

  submit(){
    let data=this.formGroup.value
    let fecha_entrega=data.fecha_entrega
    let fecha_devolucion=data.fecha_devolucion
    console.log(fecha_entrega, fecha_devolucion)
    if(fecha_entrega>=fecha_devolucion){
      this.snackbar.open("Ingrese fechas validas","Ok",{duration:2000});
    }else{      
      data.id=this.data.id
      console.log(data)
      this.service.postMethod('alumno/solicitudes',data).subscribe(data=>{
        console.log(data)
        this.dialogRef.close();
        this.router.navigate(["solicitudes"])
      })
    }
    
  }
}
