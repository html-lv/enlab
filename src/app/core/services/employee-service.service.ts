import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  private api: string = "http://localhost:3300/employees";

  constructor(
    private http: HttpClient
  ) { }

  getEmployees(): Observable<any>{
    return this.http.get(this.api, {});
  }
}
