import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';


@Component({
  selector: 'app-banca',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, PasswordModule],
  templateUrl: './banca.component.html',
  styleUrl: './banca.component.css'
})
export class BancaComponent {
  registerForm!: FormGroup;
  userLimitReached = false;
  passwordExists = false;
  maxUsers = 100;
  message = "";
  messageSuccess = false;

  ngOnInit(): void {
    this.registerForm = new FormGroup ({
      firstName: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]),
      password: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]), // password accetta minimo 8 caratteri, almeno una lettera, un numero e un carattere speciale
    });

    // Controllo quanti utenti sono già salvati nel localStorage
    const users = this.getUsersFromLocalStorage();
    if (users.length >= this.maxUsers) {
      this.userLimitReached = true;
    }
  }

  onSubmit() {
    // Controllo se è stato raggiunto precedentemente il numero massimo di conti registrati e impedisco la registrazione
    if (this.userLimitReached) {
      this.message = 'Impossibile registrarsi: limite di conti raggiunto.';
      this.messageSuccess = false;
      return;
    }

    if (this.registerForm.valid) {
      const users = this.getUsersFromLocalStorage();
      const newUser = this.registerForm.value;

      // Controllo se la password è già presente nel localStorage
      if (users.some(user => user.password === newUser.password)) {
        this.passwordExists = true;
        this.message = 'Impossibile registrarsi: credenziali già presenti nel sistema.';
        this.messageSuccess = false;
        return;
      }

      // Aggiungo il nuovo conto
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      this.message = 'Registrazione avvenuta con successo!';
      this.messageSuccess = true;

      // Dopo la registrazione, controllo se è stato raggiunto il limite con l'ultimo conto registrato
      if (users.length >= this.maxUsers) {
        this.userLimitReached = true;
      }

      // Resetto il form dopo la registrazione
      this.registerForm.reset();
    } else {
      this.message = 'Form non valido';
      this.messageSuccess = false;
    }
  }

  // Controllo se nel localStorage ho degli utenti salvati con la chiave 'users', se la condizione è soddisfatta, ottengo i dati memorizzati, ovvero, una stringa che verrà convertita in un array di oggetti con il JSON.parse; se la condizione non viene soddisfatta otterrò un array vuoto.
  private getUsersFromLocalStorage(): any[] {
    const usersString = localStorage.getItem('users');
    return usersString ? JSON.parse(usersString) : [];
  }
}
