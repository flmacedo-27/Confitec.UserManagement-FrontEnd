import { DropdownService } from './../../../../shared/services/dropdown.service';
import { Escolaridade } from './../../../../shared/models/Escolaridade';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../usuarios.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuario-create-change',
  templateUrl: './usuario-create-change.component.html',
  styleUrls: ['./usuario-create-change.component.scss'],
})
export class UsuarioCreateChangeComponent implements OnInit {
  usuarioForm: FormGroup;
  escolaridade: Observable<Escolaridade[]>;
  id: string;
  isAddMode!: boolean;
  submitted = false;
  loading = false;

  constructor(
    private dropdownService: DropdownService,
    private usuarioService: UsuariosService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.escolaridade = this.dropdownService.getEscolaridade();

    this.id = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.usuarioService
        .get(this.id)
        .pipe(first())
        .subscribe((usuario) => {
          this.usuarioForm.patchValue(usuario);
        });
    }

    this.usuarioForm = this.fb.group({
      id: [this.id],
      nome: ['', [Validators.required, Validators.maxLength(30)]],
      sobrenome: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', Validators.required],
      escolaridade: ['', Validators.required],
    });
  }

  get f() {
    return this.usuarioForm.controls;
  }

  onValidateDate(dateSelected) {
    const currentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');

    if (dateSelected > currentDate) {
      this.usuarioForm.get('dataNascimento').setErrors({ incorrect: true });
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.usuarioForm.invalid) return;

    this.loading = true;
    if (this.isAddMode) {
      this.createUsuario();
    } else {
      this.updateUsuario();
    }
  }

  private createUsuario() {
    this.usuarioService
      .insert(this.usuarioForm.value)
      .pipe(first())
      .subscribe(
        (sucess) => {
          alert(sucess);
          this.router.navigateByUrl('/usuarios');
        },
        (err) => {
          if (err.status == 500) {
            alert(err.error);
          }
        }
      )
      .add(() => (this.loading = false));
  }

  private updateUsuario() {
    this.usuarioService
      .update(this.usuarioForm.value)
      .pipe(first())
      .subscribe(
        (sucess) => {
          alert(sucess);
          this.router.navigateByUrl('/usuarios');
        },
        (err) => {
          if (err.status == 500) {
            alert(err.error);
          } else if (err.status == 403) {
            alert(err.error.message);
          }
        }
      )
      .add(() => (this.loading = false));
  }
}
