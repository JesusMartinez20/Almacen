import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SolicitarComponent } from '../solicitar/solicitar.component';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  url:string
  data;
  tipo_cuenta;
  id;

  constructor(private route:ActivatedRoute, private service:RequestService, private router:Router,public dialog: MatDialog) { 
   
  }

  ngOnInit(): void {
    this.tipo_cuenta=localStorage.getItem('tipo_cuenta')
    this.route.params.subscribe(params=>{
      this.id=params['id']
      this.url="general/materiales/"+params['id']
      this.service.getPosts(this.url).subscribe(data=>{
        this.data=data[0]
      });
    });
  }

  editar(){
    this.router.navigate(["editar/"+this.id]);
  }

  borrar(){
    this.service.deleteMethod('admin/materiales/'+this.id,{}).subscribe(data=>{
      console.log(data)
      this.router.navigate(["catalogo"]);
    })
  }

  solicitar(){
    const dialogRef = this.dialog.open(SolicitarComponent,{
      data: { id: this.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });
  }

  openDialog() {
    
  }

}
