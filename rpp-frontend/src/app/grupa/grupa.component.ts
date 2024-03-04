import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Grupa } from '../model/grupa.model';
import { MatDialog } from '@angular/material/dialog';
import { GrupaService } from '../service/grupa.service';
import { GrupaDialogComponent } from '../dialog/grupa-dialog/grupa-dialog.component';
import { Student } from '../model/student.model';

@Component({
  selector: 'app-grupa',
  templateUrl: './grupa.component.html',
  styleUrls: ['./grupa.component.css']
})
export class GrupaComponent implements OnInit,OnChanges {

  displayedColumns=['id','oznaka','smer','actions'];
  dataSource!:MatTableDataSource<Grupa>;
  selektovanaGrupa!:Grupa
  @Input() 
  selektovanaStudent!:Student
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private grupaService:GrupaService,private dialog:MatDialog){}

  ngOnInit():void{
    this.loadGrupa();
  }

  ngOnChanges(){
    if(this.selektovanaStudent.id)
    {
      this.loadGrupa()
    }
  }

  
  public loadGrupa()
  {
    this.grupaService.getGrupa(this.selektovanaStudent.grupa.id).subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
  
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: string, key: string) => {
          return key === 'grupa' ? currentTerm + data.grupa.oznaka : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
  
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
    console.log(this.selektovanaStudent)
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

  openDialog(flag:number,id:Number,oznaka:String,smer:String)
  {
    const dialog=this.dialog.open(GrupaDialogComponent,{data:{id:id,oznaka:oznaka,smer:smer}})
    dialog.componentInstance.flag=flag;
    dialog.afterClosed().subscribe(data=>{ if (data===1){this.loadGrupa()}})
  }

}
