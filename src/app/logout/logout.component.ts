import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LogoutComponent>, private router:Router){  
  }

  ngOnInit(): void {
  }
  
  onNoClick(){
    this.dialogRef.close();
  }

  onClick(){
    localStorage.clear();
    this.dialogRef.close();
    this.router.navigate(["/"]);
    window.location.reload();
  }

}
