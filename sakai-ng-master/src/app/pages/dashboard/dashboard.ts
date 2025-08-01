import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { FaqService } from '../../services/faq.service';
import { Faq } from '../../models/Faq';
import { HttpClientModule } from '@angular/common/http';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

// WeatherService'i import et
import { WeatherService } from '../../services/weather.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
        Button,
        RouterLink
    ],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <!-- Sık Sorulan Sorular -->
            <div class="col-span-12 xl:col-span-6">
                <div class="font-bold text-2xl mb-6 text-primary">📌 Sık Sorulan Sorular</div>
                <p-accordion [activeIndex]="0">
                    <p-accordion-panel *ngFor="let faq of faqs; let i = index" [value]="i.toString()">
                        <p-accordion-header>
                            <span class="text-lg font-medium">{{ faq.question }}</span>
                        </p-accordion-header>
                        <p-accordion-content>
                            <p class="text-base text-gray-700">
                                {{ faq.answer }}
                            </p>
                        </p-accordion-content>
                    </p-accordion-panel>
                </p-accordion>
            </div>

            <!-- Hava Durumu -->
            <div class="col-span-12 xl:col-span-6">
                <div class="font-bold text-2xl mb-6 text-primary">🌤️ Güncel Hava Durumu</div>
                <div class="flex items-center gap-4 bg-blue-50 p-4 rounded-lg shadow">
                    <img [src]="weather.iconUrl" alt="hava durumu" width="64" height="64" />
                    <div>
                        <div class="text-xl font-semibold">{{ weather.city }}</div>
                        <div class="text-lg">{{ weather.temp }}°C, {{ weather.description }}</div>
                        <div class="text-sm text-gray-600">Nem: {{ weather.humidity }}%, Rüzgar: {{ weather.windSpeed }} km/h</div>
                    </div>
                </div>
                <br>
                <div style="background-color: #f0f4ff; border: 1px solid #c3dafe; padding: 1rem; border-radius: 8px; display: flex; align-items: center; gap: 0.75rem;">
                    <span style="font-size: 1.5rem;">💡</span>
                    <p style="margin: 0; font-size: 1rem; color: #333;">
                        Eğer <strong>Sık Sorulan Sorular</strong> içinde yeterli cevabı bulamadıysanız <a [routerLink]="['/talep-ac']" style="color: #2563eb; text-decoration: underline;">
                        Destek Talebi Oluşturun
                    </a>
                    </p>

                </div>
            </div>
        </div>

        <!-- Talep Butonu -->
        <div class="mt-6">
            <p-button label="📝 Destek Talebi Oluştur" class="p-button-lg" [routerLink]="['/talep-ac']"></p-button>
        </div>




        <!--Canlı dstek geçiş butonu  yeri değişecek  -->
        <div class="mt-6">

            <p-button [routerLink]="['/create-ticket']">  Canlı Destek <i class="pi pi-phone" style="font-size: 2rem"></i></p-button>

        </div>
    `
})
export class Dashboard implements OnInit {
    faqs: Faq[] = [];
    weather = {
        city: 'Ankara',
        temp: 0,
        description: '',
        humidity: 0,
        windSpeed: 0,
        iconUrl: ''
    };

    constructor(
        private faqService: FaqService,
        private weatherService: WeatherService // WeatherService'i inject et
    ) {}

    ngOnInit(): void {
        // FAQ verisini çek
        this.faqService.getFaqs().subscribe(data => {
            this.faqs = data;
        });

        // Hava durumu verisini çek
        this.weatherService.getWeather('Ankara').subscribe({
            next: (data) => {
                this.weather.city = data.name;
                this.weather.temp = Math.round(data.main.temp);
                this.weather.description = data.weather[0].description;
                this.weather.humidity = data.main.humidity;
                this.weather.windSpeed = Math.round(data.wind.speed * 3.6); // m/s -> km/h
                this.weather.iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            },
            error: (err) => {
                console.error('Hava durumu verisi alınamadı:', err);
                // İstersen default bir değer bırakabilirsin
                this.weather.description = 'Veri alınamadı';
                this.weather.iconUrl = '';
            }
        });
    }
}
