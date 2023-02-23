import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-recuperar-contrasena-usuario',
  templateUrl: './recuperar-contrasena-usuario.component.html',
  styleUrls: ['./recuperar-contrasena-usuario.component.scss']
})
export class RecuperarContrasenaUsuarioComponent implements OnInit {
  form: FormGroup;
  enviado = false;
  mensajeError: string;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email').value;
      this.usuarioService.enviarCorreo(email).subscribe(
        response => {
          this.enviado = true;
        },
        error => {
          console.error(error);
          this.mensajeError = error.msg; // mostrar mensaje de error al usuario
        }
      );
    }
  }
}
