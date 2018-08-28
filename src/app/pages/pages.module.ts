import {NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Angular Material
import {MatFormFieldModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
        MatButtonModule,
        MatInputModule,
        MatRippleModule,
        MatSelectModule} from '@angular/material';



// import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { BankComponent } from './bank/bank.component';
import { CheckComponent } from './bank/check/check.component';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        BankComponent,
        CheckComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        BankComponent
    ],
    imports: [
        CommonModule,
        MatAutocompleteModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatRippleModule,
        SharedModule,
        PAGES_ROUTES,
        BrowserModule,
        ChartsModule,
        PipesModule,
        FormsModule,
        ReactiveFormsModule
    ]

})
export class PagesModule { }
