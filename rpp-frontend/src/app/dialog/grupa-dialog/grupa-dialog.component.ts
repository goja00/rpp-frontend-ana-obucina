import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Grupa } from 'src/app/model/grupa.model';
import { GrupaService } from 'src/app/service/grupa.service';

@Component({
  selector: 'app-grupa-dialog',
  templateUrl: './grupa-dialog.component.html',
  styleUrls: ['./grupa-dialog.component.css']
})
export class GrupaDialogComponent {

  public flag!:number

  constructor(
  @Inject(MAT_DIALOG_DATA)public grupa:Grupa,
  public dialogRef: MatDialogRef<GrupaDialogComponent>,
  public grupaService:GrupaService,
  public snackBar: MatSnackBar,
  ){}
  
  add()
  {
  this.grupaService.addGrupa(this.grupa)
  this.snackBar.open('Uspesno ste dodali grupu!','OK',{duration:1500})
  
  }
  update()
  {this.grupaService.updateGrupa(this.grupa)
    this.snackBar.open('Uspesno ste azurirali grupu!','OK',{duration:1500})}
  delete()
  {
    this.grupaService.deleteGrupa(this.grupa)
    this.snackBar.open('Uspesno ste izbrisali grupu!','OK',{duration:1500})
  }
  cancel()
  {
    this.dialogRef.close()
  }



}
