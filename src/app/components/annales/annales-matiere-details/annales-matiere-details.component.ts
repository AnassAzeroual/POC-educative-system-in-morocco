import { Component, OnInit, Pipe, PipeTransform } from "@angular/core";
import { LocalStorageService } from "src/app/services/LocalStorage/local-storage.service";
import { AnnalesService } from "src/app/services/annales-service/annales.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-annales-matiere-details",
  templateUrl: "./annales-matiere-details.component.html",
  styleUrls: ["./annales-matiere-details.component.css"]
})
export class AnnalesMatiereDetailsComponent implements OnInit {
  matiere = {
    libelle_objet: "الإنجيزية",
    icon: ""
  };
  profile;
  description_annales: string =
    "يجب أن تتعامل مع أحد الموضوعين. أو محادثة (كتابة حوار) بين آمي ، وكيل العقارات ورئيسه. إما مقالة عن أهمية الصداقة من خلال توضيح الموضوع الخاص بك مع أمثلة ملموسة ولماذا لا شخصية. كن حذرا لاحترام عدد الكلمات ، والتسامح من + أو - 10 ٪ (20 كلمة) دون إهمال ثراء اللغة.";
  data: Object = {};
  documentSize: number = 0;
  page = {
    total: 0,
    current: 1,
    itemsPerPage: 6,
    pages: []
  };

  constructor(
    private annales_service: AnnalesService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.profile = this.localStorageService.getLocalStorage("profile");
    this.activatedRoute.params.subscribe(data =>
      this.getMatiereObjectByCode(data.matiere)
    );
  }
  getMatiereObjectByCode(code_objet) {
    let data;
    this.annales_service.getCoursesAnnales().then(response => {
      data = response;
      let value = data.filter(value => value.code_objet == code_objet)[0];
      this.matiere.libelle_objet = value.libelle_objet;
      this.matiere.icon = value.code_objet;
      this.getAnnalesByChemin(value.chemin_arbo);
    });
  }

  getAnnalesByChemin(cheminMatiere) {
    this.annales_service.getAnnalesByCheminArbo(cheminMatiere).subscribe(
      response => {
        for (let data in response["annale_information"]) {
          this.documentSize = response["annale_information"][data].length;
        }
        this.data = response;
        this.createPagination();
      },
      error => console.log(error)
    );
  }
  sendAnnaleData(annale) {
    this.annales_service.setMatiereAnnale(annale);
  }

  createPagination() {
    this.page.total = Math.ceil(this.documentSize / this.page.itemsPerPage);
    this.page.pages = Array(this.page.total)
      .fill(0)
      .map((x, i) => i);
    console.log(this.page);
  }
}

@Pipe({ name: "keys" })
export class KeysPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    let keys = value && Object.keys(value);
    return keys;
  }
}
