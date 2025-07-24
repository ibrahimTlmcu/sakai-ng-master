import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './app/chat/chat.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, CommonModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {}
