import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import * as jwt_decode from 'jwt-decode';

interface JwtPayload {
    sub: string;
    roles: string[];
    exp: number;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user: string | null = null;
    private loggedIn = new BehaviorSubject<boolean>(false);
    private username = new BehaviorSubject<string | null>(null);
    private tokenKey = 'auth_token';

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

    getUsername() {
        return this.username.asObservable();
    }

    getUsernameValue(): string | null {
        return this.username.getValue();
    }

    private setAuthToken(token: string) {
        localStorage.setItem('auth_token', token);
    }

    private getAuthToken(): string | null {
        return localStorage.getItem('auth_token');
    }

    setToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('auth_token');
    }

    getRoles(): string[] {
        const token = this.getToken();
        if (!token) return [];
        // any cast ile çağır (çünkü import * as kullanılıyor)
        const decoded = (jwt_decode as any)(token) as JwtPayload;
        return decoded.roles || [];
    }

    hasRole(role: string): boolean {
        return this.getRoles().includes(role);
    }
}
