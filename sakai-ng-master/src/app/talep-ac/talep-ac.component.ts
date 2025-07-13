import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-talep-ac',
    imports: [DropdownModule, FormsModule, Button],
    templateUrl: './talep-ac.component.html',
    styleUrl: './talep-ac.component.scss'
})
export class TalepAcComponent {}
