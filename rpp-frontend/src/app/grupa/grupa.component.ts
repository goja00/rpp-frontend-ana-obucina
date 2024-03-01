import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Grupa } from '../model/grupa.model';
import { MatDialog } from '@angular/material/dialog';
import { GrupaService } from '../service/grupa.service';
import { GrupaDialogComponent } from '../dialog/grupa-dialog/grupa-dialog.component';

@Component({
  selector: 'app-grupa',
  templateUrl: './grupa.component.html',
  styleUrls: ['./grupa.component.css']
})
export class GrupaComponent implements OnInit,OnChanges {

  displayedColumns=['id','oznaka','smer','actions'];
  dataSource!:MatTableDataSource<Grupa>;
  selektovanaGrupa!:Grupa

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private grupaService:GrupaService,private dialog:MatDialog){}

  ngOnInit():void{
    this.loadData();
  }

  ngOnChanges(){
    if(this.selektovanaGrupa.id)
    {
      this.loadData()
    }
  }

  public loadData() 
  {
 
    this.grupaService.getAllGrupas().subscribe( data => {
     this.dataSource = new MatTableDataSource(data);
     this.dataSource.sortingDataAccessor = (data: any, property) => {
       switch(property) {
         case 'id' : return data[property];
         case 'oznaka' : return data[property];
         default: return data[property].toLocaleLowerCase();
       }
     };
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   })
   }

   selectedRow(row:Grupa)
  {
  this.selektovanaGrupa=row
  }
  applyFilter(filterValue : string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(flag:number,id:Number,oznaka:String,smer:String,students:number)
  {
    const dialog=this.dialog.open(GrupaDialogComponent,{data:{id:id,oznaka:oznaka,smer:smer}})
    dialog.componentInstance.flag=flag;
    dialog.afterClosed().subscribe(data=>{ if (data===1){this.loadData()}})
  }

}
