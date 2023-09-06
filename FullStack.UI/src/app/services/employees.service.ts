import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeesService {

  constructor(private http: HttpClient) { }

  baseApiUrl:string = environment.baseApiUrl;

  getAllEmployees() {
    return this.http.get(this.baseApiUrl + '/api/employees');
  }

  addEmployee(employee: Employee) {
    employee.id = "00000000-0000-0000-0000-000000000000"
    return this.http.post(this.baseApiUrl + '/api/employees', employee)
  }

  getEmployee(id: string) {
    return this.http.get(this.baseApiUrl + '/api/employees/' + id);
  }

  updateEmployee(id: string, employee: Employee) {
    return this.http.put(this.baseApiUrl + '/api/employees/' + id, employee);
  }

  deleteEmployee(id: string) {
    return this.http.delete(this.baseApiUrl + '/api/employees/' + id);
  }

}
