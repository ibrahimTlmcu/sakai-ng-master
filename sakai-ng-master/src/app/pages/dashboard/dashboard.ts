import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { FaqService } from '../../services/faq.service'; // göreli yol
import { Faq } from '../../models/Faq';

import { HttpClientModule } from '@angular/common/http';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, HttpClientModule, Accordion, AccordionPanel, AccordionHeader, AccordionContent, Button, RouterLink],
    template: `
        <<div class="grid grid-cols-12 gap-8">
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
                        Eğer <strong>Sık Sorulan Sorular</strong> içinde yeterli cevabı bulamadıysanız <a href="/destek-talebi" style="color: #2563eb; text-decoration: underline;">Destek Talebi Oluşturun</a>.
                    </p>
                </div>

            </div>
        </div>

        <!-- Talep Butonu -->
        <div class="mt-6">
            <p-button label="📝 Destek Talebi Oluştur" class="p-button-lg" [routerLink]="['/talep-ac']"></p-button>
        </div>

    `
})
export class Dashboard implements OnInit {
    faqs: Faq[] = [];
    weather = {
        city: 'Ankara',
        temp: 29,
        description: 'Az bulutlu',
        humidity: 52,
        windSpeed: 11,
        iconUrl: 'https://openweathermap.org/img/wn/02d.png' // OpenWeatherMap örneği
    };




    constructor(private faqService: FaqService) {}

    ngOnInit(): void {
        this.faqService.getFaqs().subscribe((data) => {
            this.faqs = data;
        });
    }


}
