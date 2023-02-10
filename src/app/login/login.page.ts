import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) { }

  get email() {
    return this.credentials.get('email')
  }
  get password() {
    return this.credentials.get('password')
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      await this.authService.register(this.credentials.value)
      this.router.navigateByUrl('/home', { replaceUrl: true })
    } catch (e) {
      console.log("error e", e)
      this.showAlert('Registration failed !', 'Please try again.')
    } finally {
      await loading.dismiss();
    }
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    try {
      await this.authService.login(this.credentials.value)
      this.router.navigateByUrl('/home', { replaceUrl: true })
    } catch (e) {
      console.log("error e", e)
      this.showAlert('Incorrect Email/password !', 'Please try again.')
    } finally {
      await loading.dismiss();
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({ header, message, buttons: ['OK'] })
    await alert.present();
  }
}
