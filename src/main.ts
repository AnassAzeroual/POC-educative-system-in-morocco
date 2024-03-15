import { enableProdMode, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DoquestionComponent } from './app/components/questrep/doquestion/doquestion.component';
import { PlanningComponent } from './app/components/planning/planning.component';
import { ExPazapaComponent } from './app/components/ex-pazapa/ex-pazapa.component';
import { QuestionsReponsesComponent } from './app/components/questrep/questions-reponses/questions-reponses.component';
import { CoursVideoComponent } from './app/components/cours-video/cours-video.component';
import { ArbreComponent } from './app/components/arbre/arbre.component';
import { AgendaComponent } from './app/components/agenda/agenda.component';
import { EmailValidateComponent } from './app/components/email-validate/email-validate.component';
import { ExerciceVideoComponent } from './app/components/exercice-video/exercice-video.component';
import { HistoriqueComponent } from './app/components/historique/historique.component';
import { AnnalesDisplayComponent } from './app/components/annales/annales-display/annales-display.component';
import { AnnalesMatiereDetailsComponent } from './app/components/annales/annales-matiere-details/annales-matiere-details.component';
import { AnnalesComponent } from './app/components/annales/annales.component';
import { ControleComponent } from './app/components/controle/controle.component';
import { CoursComponent } from './app/components/cours/cours.component';
import { ClassementComponent } from './app/components/classement/classement.component';
import { CompteComponent } from './app/components/compte/compte.component';
import { InfoQuizComponent } from './app/components/info-quiz/info-quiz.component';
import { ProfilComponent } from './app/components/profil/profil.component';
import { BlocMatiereComponent } from './app/components/bloc-matiere/bloc-matiere.component';
import { AccueilComponent } from './app/components/accueil/accueil.component';
import { StatistiqueComponent } from './app/components/statistique/statistique.component';
import { withHashLocation, provideRouter, Routes } from '@angular/router';
import { NotifierModule } from 'angular-notifier';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NeedAuthGuard } from './app/NeedAuthGuard';
import { LocalStorageService } from './app/services/LocalStorage/local-storage.service';
import { BlocService } from './app/services/blocService/bloc.service';
import { QuizServiceService } from './app/services/quizService/quiz-service.service';

const appRoutes: Routes = [
  { path: "", component: StatistiqueComponent }, // AuthComponent
  { path: "home", component: AccueilComponent },
  { path: "blocs", component: BlocMatiereComponent },
  { path: "profil", component: ProfilComponent },
  { path: "quiz/:id", component: InfoQuizComponent },
  { path: "compte", component: CompteComponent },
  { path: "score", component: ClassementComponent },
  { path: "Cours", component: CoursComponent },
  { path: "controle", component: ControleComponent },
  { path: "annales", component: AnnalesComponent },
  { path: "annales/:matiere", component: AnnalesMatiereDetailsComponent },
  { path: "annales/:matiere/display", component: AnnalesDisplayComponent },
  { path: "histo", component: HistoriqueComponent },
  { path: "exercice-video", component: ExerciceVideoComponent },
  { path: "validate/:id/:token/:email", component: EmailValidateComponent },
  { path: "agenda", component: AgendaComponent },
  { path: "statistique", component: StatistiqueComponent },
  { path: "arbre", component: ArbreComponent },
  { path: "cours-video", component: CoursVideoComponent },
  { path: "questrep", component: QuestionsReponsesComponent },
  { path: "exercice-pazapa", component: ExPazapaComponent },
  { path: "planning", component: PlanningComponent },
  { path: "comment", component: DoquestionComponent }
];



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(FormsModule, BrowserModule, NotifierModule, NgbModule),
        QuizServiceService,
        BlocService,
        LocalStorageService,
        NeedAuthGuard,
        CookieService,
        { provide: LOCALE_ID, useValue: "ar-SA" },
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(appRoutes, withHashLocation())
    ]
})
  .catch(err => console.error(err));

