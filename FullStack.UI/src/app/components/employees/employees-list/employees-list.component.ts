import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})

export class EmployeesListComponent implements OnInit{

  constructor(public service: EmployeesService){};

  employees: Employee[] = [];

  ngOnInit(): void {
    this.service.getAllEmployees()
      .subscribe({
        next: res => {
          this.employees = res as Employee[]
        },
        error: err => { console.log(err) }
      })
  }
} 
