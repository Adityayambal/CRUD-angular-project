import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-studentcrud',
  templateUrl: './studentcrud.component.html',
  styleUrls: ['./studentcrud.component.scss']
})
export class StudentcrudComponent 
{


  StudentArray : any[] = [];
  currentStudentID = "";

  name: string ="";
  email : string = "";
  department : string = "";
  position : string = "";
  joiningdate : string = "";
  
  constructor(private http: HttpClient ) 
  {
    this.getAllStudent();
  }
  getAllStudent() {

    this.http.get("http://localhost:3000/user/getAll")
    .subscribe((resultData: any)=>
    {
       
        console.log(resultData);
        this.StudentArray = resultData.data;
    });


  }

  setUpdate(data: any) 
  {
   this.name = data.name;
   this.email = data.email;
   this.department = data.department;
   this.position = data.position;
   this.joiningdate = data.joiningdate;

   this.currentStudentID = data._id;
  
  }

  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "email" : this.email,
      "department" : this.department,
      "position" : this.position,
      "joiningdate" : this.joiningdate

    };
    
    this.http.patch("http://localhost:3000/user/update"+ "/"+this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Updateddd")
        this.getAllStudent();
      
    });
  }
  
  setDelete(data: any) {
    this.http.delete("http://localhost:3000/user/delete"+ "/"+ data._id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deletedddd")
        this.getAllStudent();
   
    });
    }
    
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       

  }

register()
  {

    let bodyData = {
      "name" : this.name,
      "email" : this.email,
      "department" : this.department,
      "position" : this.position,
      "joiningdate" : this.joiningdate
  };
    this.http.post("http://localhost:3000/user/create",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Successfully")
         //this.getAllEmployee();
        this.name = '';
        this.email = '';
        this.department = '';
        this.position = '';
        this.joiningdate = '';

        this.getAllStudent();
    });
  }
}
