import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { DenemeComponent } from './app/pages/deneme/deneme.component';
import { authGuard } from './app/guards/auth.guard';
import { TalepAcComponent } from './app/talep-ac/talep-ac.component';
import { Login } from './app/pages/auth/login';
import { KategoriEkleComponent } from './app/kategori-ekle/kategori-ekle.component';
import { AdminGelenTaleplerComponent } from './app/admin-gelen-talepler/admin-gelen-talepler.component';
import { Register } from './app/pages/auth/Register'; // ✅ Bu önemli

export const appRoutes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'register', component: Register },

    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'documentation', component: Documentation },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
            { path: 'talep-ac', component: TalepAcComponent },
            { path: 'kategori-ekle', component: KategoriEkleComponent },
            { path: 'deneme', component: DenemeComponent, canActivate: [authGuard] },
            { path: 'admin-gelen-talepler',component:AdminGelenTaleplerComponent} ,

        ]
    },

    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },

    // login burada yükleniyor
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes').then(m => m.default) },

    { path: '**', redirectTo: '/notfound' }
];

