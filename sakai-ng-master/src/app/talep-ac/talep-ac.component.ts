import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

import { KategoriService } from '../services/kategori.service';
import { AxiosService } from '../services/axios.service';

@Component({
    selector: 'app-talep-ac',
    standalone: true,
    imports: [DropdownModule, ButtonModule, InputTextModule, FormsModule, TextareaModule],
    templateUrl: './talep-ac.component.html',
    styleUrls: ['./talep-ac.component.scss']
})
export class TalepAcComponent implements OnInit {
    talep = {
        adSoyad: '',
        email: '',
        konu: '',
        kategoriId: null,
        aciklama: ''
    };

    kategoriler: any[] = [];

    constructor(
        private axiosService: AxiosService,
        private kategoriService: KategoriService,
        private router: Router
    ) {}

    async ngOnInit() {
        try {
            this.kategoriler = await this.kategoriService.getKategoriler();
        } catch (err) {
            console.error('Kategori yüklenemedi:', err);
        }
    }

    async talepGonder() {
        try {
            console.log('Form gönderiliyor:', this.talep);
            const response = await this.axiosService.request('post', '/api/talepler', this.talep);
            console.log('Talep başarıyla gönderildi:', response.data);
            alert('Talep başarıyla iletildi.');
            this.router.navigate(['/dashboard']);
        } catch (error: any) {
            console.error('Talep gönderme hatası:', error);
            alert('Bir hata oluştu, lütfen tekrar deneyin.');
        }
    }
}
