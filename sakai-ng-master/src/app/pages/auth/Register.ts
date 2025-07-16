import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AxiosService } from '../../services/axios.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ButtonModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px; max-width: 400px;">
                        <div class="text-center mb-8">
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Create an Account</div>
                            <span class="text-muted-color font-medium">Register to start your journey</span>
                        </div>

                        <div>
                            <label for="firstName" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">First Name</label>
                            <input pInputText id="firstName" type="text" placeholder="First Name" class="w-full mb-6" [(ngModel)]="registerData.firstName" />

                            <label for="lastName" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Last Name</label>
                            <input pInputText id="lastName" type="text" placeholder="Last Name" class="w-full mb-6" [(ngModel)]="registerData.lastName" />

                            <label for="login" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Username</label>
                            <input pInputText id="login" type="text" placeholder="Username" class="w-full mb-6" [(ngModel)]="registerData.login" />

                            <label for="password" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <p-password id="password" [(ngModel)]="registerData.password" placeholder="Password" [toggleMask]="true" styleClass="mb-6" [feedback]="true" [fluid]="true"></p-password>

                            <label for="confirmPassword" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Confirm Password</label>
                            <p-password id="confirmPassword" [(ngModel)]="registerData.confirmPassword" placeholder="Confirm Password" [toggleMask]="true" styleClass="mb-8" [feedback]="false" [fluid]="true"></p-password>

                            <p-button label="Register" styleClass="w-full" (click)="onRegister()"></p-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Register {
    registerData = {
        firstName: '',
        lastName: '',
        login: '',
        password: '',
        confirmPassword: ''
    };

    constructor(
        private axiosService: AxiosService,
        private router: Router
    ) {}

    async onRegister() {
        if (this.registerData.password !== this.registerData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await this.axiosService.request('post', '/register', {
                firstName: this.registerData.firstName,
                lastName: this.registerData.lastName,
                login: this.registerData.login,
                password: this.registerData.password
            });

            alert('Registration successful! Please login.');
            this.router.navigate(['/login']);
        } catch (error: any) {
            console.error('Registration failed:', error);
            alert('Registration failed! Please try again.');
        }
    }
}
