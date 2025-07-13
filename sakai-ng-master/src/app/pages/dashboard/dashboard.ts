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
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-12 xl:col-span-6">
                <div class="font-semibold text-xl mb-4">Sık Sorulan Sorular</div>
                <p-accordion>
                    <p-accordion-panel *ngFor="let faq of faqs; let i = index" [value]="i.toString()">
                        <p-accordion-header>{{ faq.question }}</p-accordion-header>
                        <p-accordion-content>
                            <p class="m-0">
                                {{ faq.answer }}
                            </p>
                        </p-accordion-content>
                    </p-accordion-panel>
                </p-accordion>
            </div>
        </div>
        <br />
        <p-button label="Destek Talebi Olustur" [routerLink]="['/talep-ac']"></p-button>
    `
})
export class Dashboard implements OnInit {
    faqs: Faq[] = [];

    constructor(private faqService: FaqService) {}

    ngOnInit(): void {
        this.faqService.getFaqs().subscribe((data) => {
            this.faqs = data;
        });
    }
}
