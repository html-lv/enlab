import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeInterface } from '../../interfaces/employee-interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  private api: string = "http://localhost:6600/employees";

  constructor(
    private http: HttpClient
  ) { }

  getEmployees(office?: string): Observable<EmployeeInterface[]>{
    const url = office ? `${this.api}?office=${office}` : this.api;
    return this.http.get<EmployeeInterface[]>(url);
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, {
        "first_name": employee.first_name,
        "last_name": employee.last_name,
        "office": employee.office,
        "phone": employee.phone
    });
}

  createEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.api}`, {
      "id": employee.id,
      "first_name": employee.first_name,
      "last_name": employee.last_name,
      "office": employee.office,
      "birth_day": employee.birth_day,
      "phone": employee.phone
    })
  }

}
