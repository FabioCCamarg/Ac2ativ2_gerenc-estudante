import { Component, OnInit } from '@angular/core';
import { StudentService } from './../../services/student.service';
import { Student } from '../../models/students';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
})
export class StudentListComponent implements OnInit {
  isLoading = true;
  isError = false;
  successMessage: string = '';

  students: Student[] = [];

  constructor(private StudentService: StudentService) {}
  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.StudentService.listarTodos().subscribe(
      (data) => {
        this.students = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao listar estudantes', error);
        this.isError = true;
        this.isLoading = false;
      }
    );
  }

  deleteStudent(id: string): void {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar ?');
    if (confirmDelete) {
      this.StudentService.deletarStudent(id).subscribe(
        () => {
          this.getStudents();
          this.successMessage = 'Deletado com Sucesso!';
          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
        },
        (error) => {
          console.error('Errro ao deletar estudante', error);
        }
      );
    }
  }
}
