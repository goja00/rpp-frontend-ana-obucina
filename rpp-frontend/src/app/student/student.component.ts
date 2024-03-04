import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../model/student.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentService } from '../service/student.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from '../dialog/student-dialog/student-dialog.component';
import { Grupa } from '../model/grupa.model';
import { Projekat } from '../model/projekat.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  displayedColumns=['id','broj_indeksa','ime','prezime','grupa','projekat','actions'];
  dataSource!:MatTableDataSource<Student>;
  selektovanaStudent!:Student

  grupa1!:Grupa
  projekat1!:Projekat
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private studentService:StudentService,private dialog:MatDialog){}

  ngOnInit():void{
    this.loadData();
  }

  ngOnChanges(){
    if(this.selektovanaStudent.id)
    {
      this.loadData()
    }
  }

  public loadData() 
  {
 
    this.studentService.getAllStudents().subscribe( data => {
     this.dataSource = new MatTableDataSource(data);
     this.dataSource.sortingDataAccessor = (data: any, property) => {
       switch(property) {
         case 'id' : return data[property];
         case 'ime' : return data[property];
         case 'prezime' : return data[property];
         case 'grupa' : return data[property];
         default: return data[property].toLocaleLowerCase();
       }
     };
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   })
   }

   selectedRow(row:Student)
  {
  this.selektovanaStudent=row
  }
  applyFilter(filterValue : string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(flag:number,id:Number,broj_indeksa:string,ime:string,prezime:string,grupa:Grupa,projekat:Projekat)
  {
    const dialog=this.dialog.open(StudentDialogComponent,{data:{id:id,broj_indeksa:broj_indeksa,ime:ime,prezime:prezime,grup:grupa,projekat:projekat}})
    dialog.componentInstance.flag=flag;
    dialog.afterClosed().subscribe(data=>{ if (data===1){this.loadData()}})
  }


}
