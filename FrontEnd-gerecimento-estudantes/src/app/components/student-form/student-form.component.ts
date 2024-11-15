import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Student } from '../../models/students';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  editMode = false;
  successMessage:string ='';
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.studentForm = this.fb.group({
      nome: ['', Validators.required],
      idade: ['', [Validators.required, Validators.min(1)]],
      curso: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.studentService.listarTodos().subscribe((students) => {
        const student = students.find((s: Student) => s._id === id);
        if (student) {
          this.studentForm.patchValue(student);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      if (this.editMode) {
        this.studentService
          .atualizarStudent(
            this.route.snapshot.paramMap.get('id')!,
            this.studentForm.value
          )
          .subscribe(() => {
            this.successMessage = 'Editado com Sucesso!';
            setTimeout(()=> {
              this.successMessage = '';
              this.router.navigate(['/students']);
            }, 2000);

          });
      } else {
        this.studentService
          .criarStudent(this.studentForm.value)
          .subscribe(() => {
            this.successMessage = 'Estudante criado com Sucesso!';
            setTimeout(() => {
              this.successMessage = '';
              this.router.navigate(['/students']);
            }, 2000);
          });
      }
    }
  }
  voltar() {
    this.location.back();
  }
}
