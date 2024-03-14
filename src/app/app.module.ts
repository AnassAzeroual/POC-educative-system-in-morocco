import { registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import LocalAR_SA from "@angular/common/locales/ar-SA";
import { LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NotifierModule } from "angular-notifier";
import { CookieService } from "ngx-cookie-service";
import { NeedAuthGuard } from "./NeedAuthGuard";
import { AppComponent } from "./app.component";
import { AccueilComponent } from "./components/accueil/accueil.component";
import { AgendaComponent } from "./components/agenda/agenda.component";
import { AnnalesDisplayComponent } from "./components/annales/annales-display/annales-display.component";
import {
  AnnalesMatiereDetailsComponent,
  KeysPipe
} from "./components/annales/annales-matiere-details/annales-matiere-details.component";
import { AnnalesComponent } from "./components/annales/annales.component";
import { ArbreComponent } from "./components/arbre/arbre.component";
import { AuthComponent } from "./components/auth/auth.component";
import { BlocMatiereComponent } from "./components/bloc-matiere/bloc-matiere.component";
import { BoxSidebarComponent } from "./components/box-sidebar/box-sidebar.component";
import { BugReportComponent } from "./components/bug-report/bug-report.component";
import { ClassementComponent } from "./components/classement/classement.component";
import { CompteComponent } from "./components/compte/compte.component";
import { ControleComponent } from "./components/controle/controle.component";
import { CoursVideoComponent } from "./components/cours-video/cours-video.component";
import { CoursComponent } from "./components/cours/cours.component";
import { EmailValidateComponent } from "./components/email-validate/email-validate.component";
import { ExPazapaComponent } from "./components/ex-pazapa/ex-pazapa.component";
import { ExerciceVideoComponent } from "./components/exercice-video/exercice-video.component";
import { HistoriqueComponent } from "./components/historique/historique.component";
import { InfoQuizComponent } from "./components/info-quiz/info-quiz.component";
import { PlanningComponent } from "./components/planning/planning.component";
import { ProfilComponent } from "./components/profil/profil.component";
import { DoquestionComponent } from "./components/questrep/doquestion/doquestion.component";
import { QuestionsReponsesComponent } from "./components/questrep/questions-reponses/questions-reponses.component";
import { AppliqueComponent } from "./components/sidebare/applique/applique.component";
import { ApprendsComponent } from "./components/sidebare/apprends/apprends.component";
import { ConcoursComponent } from "./components/sidebare/concours/concours.component";
import { NoteComponent } from "./components/sidebare/note/note.component";
import { OutilsComponent } from "./components/sidebare/outils/outils.component";
import { ParcoursComponent } from "./components/sidebare/parcours/parcours.component";
import { QrComponent } from "./components/sidebare/qr/qr.component";
import { ReussiteComponent } from "./components/sidebare/reussite/reussite.component";
import { StatistiqueComponent } from "./components/statistique/statistique.component";
import { BoutonHomeComponent } from "./components/ui/bouton-home/bouton-home.component";
import { FooterComponent } from "./components/ui/footer/footer.component";
import { NavbarComponent } from "./components/ui/navbar/navbar.component";
import { IframeDirective } from "./directives/iframe.directive";
import { LocalStorageService } from "./services/LocalStorage/local-storage.service";
import { BlocService } from "./services/blocService/bloc.service";
import { QuizServiceService } from "./services/quizService/quiz-service.service";

// Register for locale arabic
registerLocaleData(LocalAR_SA, "ar-SA");
//routes
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

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    BlocMatiereComponent,
    ReussiteComponent,
    QrComponent,
    OutilsComponent,
    NoteComponent,
    BoutonHomeComponent,
    FooterComponent,
    ProfilComponent,
    InfoQuizComponent,
    AuthComponent,
    CompteComponent,
    NavbarComponent,
    ClassementComponent,
    CoursComponent,
    ParcoursComponent,
    ApprendsComponent,
    ConcoursComponent,
    AppliqueComponent,
    ControleComponent,
    AnnalesComponent,
    AnnalesMatiereDetailsComponent,
    AnnalesDisplayComponent,
    HistoriqueComponent,
    EmailValidateComponent,
    IframeDirective,
    ExerciceVideoComponent,
    EmailValidateComponent,
    AgendaComponent,
    StatistiqueComponent,
    ArbreComponent,
    CoursVideoComponent,
    QuestionsReponsesComponent,
    DoquestionComponent,
    ExPazapaComponent,
    PlanningComponent,
    BugReportComponent,
    BoxSidebarComponent,
    KeysPipe
    // AccueilPageComponent,
    // SidebarComponent,
    // AllstudentComponent,
    // OnestudentComponent,
    // DetailInfoComponent,
    // ParentCompteComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NotifierModule,
    // FullCalendarModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true,enableTracing: false }
    ),
    NgbModule
  ],
  providers: [
    QuizServiceService,
    BlocService,
    LocalStorageService,
    NeedAuthGuard,
    CookieService,
    { provide: LOCALE_ID, useValue: "ar-SA" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
