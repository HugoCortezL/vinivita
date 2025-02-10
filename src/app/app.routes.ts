import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { Constants } from './core/utils/Constants';

export const routes: Routes = [
    {
        path: Constants.paths.HOME_PATH,
        component: HomeComponent
    },
    {
        path: Constants.paths.REGISTER_PATH,
        component: RegisterComponent
    },
    {
        path: Constants.paths.LOGIN_PATH,
        component: LoginComponent
    },
];
