import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  data:[];

  agregar=false

  constructor(private service:RequestService) { }

  ngOnInit(): void {
    if(localStorage.getItem('tipo_cuenta')=='admin'){
      this.agregar=true;
    }
    this.service.getPosts('general/catalogo').subscribe(data=>{
      let response:any=data
      this.data=response
      console.log(response)
    })
  }

  agregarMaterial(){
    
  }

}
