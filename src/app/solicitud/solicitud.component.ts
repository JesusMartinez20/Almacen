import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  url:string
  data;
  tipo_cuenta;
  id;

  selected;

  constructor(private route:ActivatedRoute, private service:RequestService, private router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.tipo_cuenta=localStorage.getItem('tipo_cuenta')
    this.route.params.subscribe(params=>{
      this.id=params['id']
      this.url="general/solicitudes/"+params['id']
      this.service.getPosts(this.url).subscribe(data=>{
        this.data=data[0]
        this.selected=this.data.estatus
        console.log(this.data)
      });
    });
  }

  submit(){
    let data={
      estatus:this.selected,
      id:this.id
    }
    this.service.putMethod('admin/solicitudes',data).subscribe(data=>{
      this.router.navigate(['solicitudes'])
    })
  }

}
