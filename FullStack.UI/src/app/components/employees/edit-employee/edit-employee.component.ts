import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styles: [
  ]
})
export class EditEmployeeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: EmployeesService,
    private router: Router
  ) {}

  employee: Employee = new Employee();

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: param => {
        const id = param.get('id');

        if(id) {
          this.service.getEmployee(id).subscribe({
            next: res => {
              this.employee = res as Employee;
            },
            error: err => console.log(err)
          })
        }


      }
    })
  }

  updateEmployee() {
    this.service.updateEmployee(this.employee.id, this.employee)
      .subscribe({
        next: res => {
          this.router.navigate(['employees'])
        },
        error: err => console.log(err)
      })
  }

  deleteEmployee() {
    this.service.deleteEmployee(this.employee.id).subscribe({
      next: res => {
        this.router.navigate(['employees'])
      },
      error: err => console.log(err)
    })
  }
}
