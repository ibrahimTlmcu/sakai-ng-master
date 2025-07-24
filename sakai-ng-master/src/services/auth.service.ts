    import { Injectable } from '@angular/core';
    import { BehaviorSubject } from 'rxjs';
    import { Router } from '@angular/router';

    @Injectable({
      providedIn: 'root'
    })
// auth.service.ts
    @Injectable({
        providedIn: 'root'
    })
    export class AuthService {
        private user: string | null = null;
        private loggedIn = new BehaviorSubject<boolean>(false);
        private username = new BehaviorSubject<string | null>(null);


        constructor(private router: Router) {
            const storedUsername = localStorage.getItem('username');
            if (storedUsername) {
                this.username.next(storedUsername);
                this.loggedIn.next(true);
            }
        }

        logout() {
            this.user = null;
            localStorage.removeItem('username');
            // Eğer token varsa onu da temizle
            localStorage.removeItem('auth_token');
            this.router.navigate(['/auth/login']);
        }

        setUser(name: string) {
            this.username.next(name);
            this.loggedIn.next(true);
            localStorage.setItem('username', name);
        }

        clearUser() {
            this.username.next(null);
            this.loggedIn.next(false);
            localStorage.removeItem('username'); // Kullanıcı adını sil


        }

        // Mevcut metodlarınız
        isLoggedIn(): boolean {
            return !!localStorage.getItem('auth_token');
        }

        getUsername() {
            return this.username.asObservable();
        }

        getUsernameValue(): string | null {
            return this.username.getValue();
        }

        private  setAuthToken(token: string) {
            localStorage.setItem('auth_token', token);
        }

        private getAuthToken(): string | null {
            return localStorage.getItem('auth_token');
        }



    }
