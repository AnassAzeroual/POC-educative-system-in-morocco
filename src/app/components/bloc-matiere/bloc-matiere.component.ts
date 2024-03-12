import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BlocService } from "src/app/services/blocService/bloc.service";
import { LocalStorageService } from "src/app/services/LocalStorage/local-storage.service";
import { Router, ActivatedRoute } from "@angular/router";
import { QuizServiceService } from "src/app/services/quizService/quiz-service.service";
import { ControleService } from "src/app/services/controleService/controle.service";

declare var $: any;

@Component({
  selector: "app-bloc-matiere",
  templateUrl: "./bloc-matiere.component.html",
  styleUrls: ["./bloc-matiere.component.css"]
})
export class BlocMatiereComponent implements OnInit {
  constructor(
    private controleService: ControleService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private blocService: BlocService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private quizService: QuizServiceService
  ) {}

  chemin;
  matieres;
  matiere;
  label;
  allData;
  matiereName;
  routefragment;
  bl;
  quiznoeud;
  co;
  cheminCour;
  cr;
  cheminControl;
  ep;
  cheminexopazapa;
  ev;
  cheminexovideo;
  cv;
  chemincourvideo;
  firstNumber = 5;
  blocCode = [];
  existBl = true;
  objectsMat = [];
  name;
  noeud;
  idUser;
  hidepazapa;

  ngOnInit() {
    let name;
    let label;
    let chemin;
    let matiere;
    let blocCode = [];
    let ids = [];
    let data = [];
    let blocs = [];
    let blocs2 = [];
    let cours = [];
    let chemincours = [];
    let firstNumber = this.firstNumber;
    let key;
    let setdata;
    let exist;
    //request to all blocs
    let local = this.localStorageService;
    let key2 = "mat";
    let matiereName;

    this.route.fragment.subscribe(fragments => {
      this.routefragment = fragments;
      let routesTable = fragments.split("/");
      console.log(routesTable);
      matiereName = this.matiereName = routesTable[0];
      name = this.name = routesTable[routesTable.length - 1];
      for (let i = 0; i < routesTable.length; i++) {}
    });

    /*check session*/

    const req = this.http.post("../../../sessions/read.php", null).subscribe(
      (res: any[]) => {
        this.idUser=res["id_user"];
        this.getMatiere(res["chemin_classe"], name, matiereName);

      },
      err => {
        this.localStorageService.destructSession();
        this.router.navigateByUrl("/");
      }
    );
    //end

    //  $('.res-mat').slideUp();
    $(document).on("mouseenter", ".panel-heading", function() {
      /*$('.res-mat').fadeIn(1500);*/
      $(this)
        .next("div")
        .stop(true)
        .slideDown("fast", "linear");
    });
    $(document).on("mouseenter", ".res-mat", function() {
      $(this)
        .stop(true)
        .slideDown("fast", "linear");
    });
    $(document).on("mouseleave", ".res-mat", function() {
      $(this)
        .stop(true)
        .slideUp(300);
    });
    $(document).on("mouseleave", ".panel-heading", function() {
      $(this)
        .next("div")
        .stop(true)
        .slideUp(300);
    });
  }

  //get  matieres
  getMatiere(chemin, name, matiereName) {
    let local = this.localStorageService;
    let key = "mat";
    let matiere;
    if (local.getLocalStorage(key)) {
      this.matieres = local.getLocalStorage(key);
      this.matieres.forEach(function(value) {
        if (value["libelle_objet"] == matiereName) {
          matiere = value;
        }
      });
      this.showSubBloc(matiere);
    } 
    else {
      let senddata={"param":chemin};
      this.http.post('../../../api/arbo/read_path', senddata)
        .subscribe(
          (res: any[]) => {
            let matieres = [];
            res["records"].forEach(function(value) {
              if(value["type_objet"]=="MA"){
                 matieres.push(value);
              }
            });
            this.matieres=matieres;
            local.storeLocalStorage(this.matieres,key);   
            this.matieres.forEach(function(value) {
              if (value["libelle_objet"] == matiereName) {
                matiere = value;
              }
            });
            this.showSubBloc(matiere);         
          },
          err => {
            this.router.navigateByUrl("/");
            this.localStorageService.destructSession(); 
          }
      );
      //this.router.navigateByUrl("/home");
    }
  }

  //show sub blocs
  showSubBloc(bloc) {
    let local = this.localStorageService;
    let nameBlocs;
    this.noeud = bloc;
    this.label = bloc["libelle_objet"];
    this.getQuizOfNoeud(bloc["chemin_arbo"]);

    nameBlocs = local.getLocalStorage("blocs");
    nameBlocs.push(bloc["libelle_objet"]);
    nameBlocs = nameBlocs.filter((el, i, a) => i === a.indexOf(el));
    local.storeLocalStorage(nameBlocs, "blocs");

    let key = this.matiereName;
    //get route
    if (local.getLocalStorage(key)) {
      this.allData = local.getLocalStorage(key);
      this.searchAllBlocs(this.allData, bloc);
    } else {
      let setdata = {
        param: bloc["chemin_arbo"] + "5"
      };
      const request = this.http
        .post("../../../api/arbo/read_path", setdata)
        .subscribe(
          (response: any[]) => {
            console.log(response);
            this.allData = response["records"];
            local.storeLocalStorage(response["records"], key);
            this.searchAllBlocs(this.allData, bloc);
          },
          err => {
            this.router.navigateByUrl("/home");
          }
        );
    }
  }

  searchAllBlocs(allData, bloc) {
    let name;
    let blocs1 = [];
    let blocs2 = [];
    let blocs3 = [];
    let cours = [];
    let chemincours = [];
    let control = [];
    let chemincontrol = [];
    let exopazapa = [];
    let cheminexopazapa = [];
    let covideo = [];
    let chemincovideo = [];
    let exovideo = [];
    let cheminexovideo = [];
    let existOfCour = false;
    let i = 0;

    this.allData.forEach(function(value, key) {
      if (
        bloc["id_arbo"] == value["id_arbo_parent"] &&
        value["type_objet"] == "BL"
      ) {
        blocs1.push(value);
      }
    });

    if (blocs1.length != 0) {
      let firstNumber = (this.firstNumber =
        Number(bloc["code_arbo"].charAt(0)) + 1);
      //to not have repetition in arborescence codes
      let blocCode = this.blocCode;
      blocCode.forEach(function(value, key) {
        if (value == bloc) {
          i = i + 1;
        }
        if (
          Number(value["code_arbo"].charAt(0)) ==
          Number(bloc["code_arbo"].charAt(0))
        ) {
          i = i + 1;
          blocCode[key] = bloc;
        }
      });
      if (i == 0) {
        blocCode.push(bloc);
      }

      blocCode.forEach(function(value, key) {
        if (
          Number(value["code_arbo"].charAt(0)) >
          Number(bloc["code_arbo"].charAt(0))
        ) {
          blocCode.splice(key, blocCode.length - key);
        }
      });

      this.blocCode = blocCode;

      //fragments
      let fragmentRoute;
      this.blocCode.forEach(function(value, key) {
        if (key == 0) {
          fragmentRoute = value["libelle_objet"];
        } else {
          fragmentRoute = fragmentRoute + "/" + value["libelle_objet"];
        }
      });

      console.log(this.blocCode);
      console.log(this.routefragment);
      this.routefragment = fragmentRoute;

      //
      this.allData.forEach(function(value, key) {
        //get cours si il existe le sous bloc
        if (value["type_objet"] == "CO") {
          cours.push(value);
          chemincours.push(value["chemin_arbo"].split("/", firstNumber + 1));
        }
        if (value["type_objet"] == "CR") {
          control.push(value);
          chemincontrol.push(value["chemin_arbo"].split("/", firstNumber + 1));
        }
        if (value["type_objet"] == "EP") {
          exopazapa.push(value);
          cheminexopazapa.push(
            value["chemin_arbo"].split("/", firstNumber + 1)
          );
        }
        if (value["type_objet"] == "CV") {
          covideo.push(value);
          chemincovideo.push(value["chemin_arbo"].split("/", firstNumber + 1));
        }
        if (value["type_objet"] == "EV") {
          exovideo.push(value);
          cheminexovideo.push(value["chemin_arbo"].split("/", firstNumber + 1));
        }
      });

      //les blocs apres filtrage des blocs qui n'ont pas de cours
      blocs1.forEach(function(value, keyValue) {
        chemincours.forEach(function(chemin, key) {
          if (value["code_arbo"] == chemin[firstNumber]) {
            blocs2.push(value);
          }
        });
      });

      blocs2 = blocs2.filter((el, i, a) => i === a.indexOf(el));

      if (typeof cours[0]["niveau_objet"] == "string") {
        for (let i = 0; i < cours.length; i++) {
          cours[i]["niveau_objet"] = Array(Number(cours[i]["niveau_objet"]))
            .fill(0)
            .map(function(x, i) {
              return i;
            });
        }
        for (let i = 0; i < control.length; i++) {
          control[i]["niveau_objet"] = Array(Number(control[i]["niveau_objet"]))
            .fill(0)
            .map(function(x, i) {
              return i;
            });
        }
        for (let i = 0; i < exopazapa.length; i++) {
          exopazapa[i]["niveau_objet"] = Array(
            Number(exopazapa[i]["niveau_objet"])
          )
            .fill(0)
            .map(function(x, i) {
              return i;
            });
        }
        for (let i = 0; i < covideo.length; i++) {
          covideo[i]["niveau_objet"] = Array(Number(covideo[i]["niveau_objet"]))
            .fill(0)
            .map(function(x, i) {
              return i;
            });
        }
        for (let i = 0; i < exovideo.length; i++) {
          exovideo[i]["niveau_objet"] = Array(
            Number(exovideo[i]["niveau_objet"])
          )
            .fill(0)
            .map(function(x, i) {
              return i;
            });
        }
      }

      this.existBl = true;
      this.co = cours;
      this.bl = blocs2;
      this.cr = control;
      this.ep = exopazapa;
      this.cv = covideo;
      this.ev = exovideo;
      this.cheminCour = chemincours;
      this.cheminControl = this.cheminControl;
      this.chemincourvideo = chemincovideo;
      this.cheminexovideo = cheminexovideo;
    } else {
      let firstNumber = (this.firstNumber = Number(
        bloc["code_arbo"].charAt(0)
      ));
      this.existBl = false;

      // changer les chemincours si on clique directement sur l'arbo
      this.allData.forEach(function(value, key) {
        if (value["type_objet"] == "CO") {
          chemincours.push(value["chemin_arbo"].split("/", firstNumber + 1));
        }
      });

      //*to not have repetition in arborescence codes
      let blocCode = this.blocCode;
      blocCode.forEach(function(value, key) {
        if (value == bloc) {
          i = i + 1;
        }
        if (
          Number(value["code_arbo"].charAt(0)) ==
          Number(bloc["code_arbo"].charAt(0))
        ) {
          i = i + 1;
          blocCode[key] = bloc;
        }
      });
      if (i == 0) {
        blocCode.push(bloc);
      }
      if (this.blocCode.length == 0) {
        blocCode.push(bloc);
      }
      blocCode.forEach(function(value, key) {
        if (
          Number(value["code_arbo"].charAt(0)) >
          Number(bloc["code_arbo"].charAt(0))
        ) {
          blocCode.splice(key, blocCode.length - key);
        }
      });
      this.blocCode = blocCode;
      //fin*
      this.cheminCour = chemincours;
      this.bl = [bloc];
    }

    this.getQuiz(this.bl);
    console.log(this.bl);
  }

  getQuiz(blocs) {
    this.objectsMat = [];
    for (let i = 0; i < blocs.length; i++) {
      let senddata = { "param": blocs[i]["chemin_arbo"],"id_user":this.idUser };
      console.log(senddata)
      this.http.post("../../../api/arbo/node_quiz", senddata).subscribe(
        (response: any) => {
          this.objectsMat[i] = {
            code: blocs[i]["code_arbo"],
            quiz: response["informations_des_quiz_du_noeud"]
          };
          console.log(this.objectsMat);
        },
        err => {}
      );
    }
  }

  getQuizOfNoeud(chemin) {
    let senddata = { "param": chemin,"id_user":this.idUser  };
    this.http.post("../../../api/arbo/node_quiz", senddata).subscribe(
      (response: any) => {
        this.quiznoeud = response["informations_des_quiz_du_noeud"];
        this.quiznoeud["restquiz"] =
          Number(this.quiznoeud["nombre_quiz_total"]) -
          Number(this.quiznoeud["nombre_quiz_traités"]);
        console.log(this.quiznoeud);
      },
      err => {
        return {};
      }
    );
  }

  begin_quiz(noeud) {
    this.quizService.setNoeud(noeud);
    this.quizService.setChemin(this.routefragment);
  }

  getobject(control) {
    let object;
    let matiere = this.getSelectedmatiere();
    object = {
      object: control,
      id_matiere: matiere["id_objet"]
    };
    this.controleService.setObject(object);
    console.log(object);
  }

  getSelectedmatiere() {
    let matiere;
    let data_matieres = this.localStorageService.getLocalStorage("mat");
    data_matieres.forEach(element => {
      if (element["libelle_objet"] == this.matiereName) {
        matiere = element;
      }
    });
    return matiere;
  }
}
