import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/students';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}`);
  }

  criarStudent(student: Student): Observable<Student[]> {
    return this.http.post<Student[]>(`${this.apiUrl}`, student);
  }

  atualizarStudent(id: string, student: Student): Observable<Student[]> {
    return this.http.put<Student[]>(`${this.apiUrl}/${id}`, student);
  }

  deletarStudent(id: string): Observable<Student[]> {
    return this.http.delete<Student[]>(`${this.apiUrl}/${id}`);
  }
}
