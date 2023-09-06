import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent {

  constructor(private service: EmployeesService, private router: Router){}

  employee: Employee = new Employee();

  addEmployee(){
    this.service.addEmployee(this.employee).subscribe({
      next: res => {
        this.router.navigate(['employees']);
      },
      error: err => console.log(err)
    })
  }
}
