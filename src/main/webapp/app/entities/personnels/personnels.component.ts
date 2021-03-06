import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CritereRechercheService } from '../critereRecherche/';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { Personnel } from './personnels.model';
import { PersonnelService } from './personnel.service';
import { PersonnelRecord } from './personnelRecord.model';
@Component({
  selector: 'jhi-personnels',
  templateUrl: './personnels.component.html',
  styles: []
})
export class PersonnelsComponent implements OnInit {
  subscription: Subscription;
  personnels: Personnel[];
  personnelRecord: PersonnelRecord;
  hover: Boolean;
  constructor(
    private personnelService: PersonnelService,
    private jhiAlertService: JhiAlertService,
    private critereRechercheService:  CritereRechercheService ) {
    this.personnels = [];
    this.personnelRecord = {menus: [], personnels: []};
   }
  ngOnInit() {
    this.personnelService.search(this.critereRechercheService.getCritere()).subscribe(
      (res: HttpResponse<PersonnelRecord>) => this.setPersonnelRecord(res.body),
      (res: HttpErrorResponse) => this.onError(res.message));
      this. critereRechercheService.ongletActive = 'Résumé';
      this.personnelService.personnelOnglets = this.initPersonnelsOnglet(this.personnelRecord.menus);
      this.hover = true;
  }
  setPersonnelRecord(data) {
   this.personnelRecord.menus = data.menus;
   this.personnelRecord.personnels = data.personnels;
  }
  private onError(error) {
    this.jhiAlertService.error(error.message, null, null);
  }
  ongletActif(onglet: string) {
    this.personnelService.setDetail(false);
    this.critereRechercheService.setOngletActive(onglet);
   }
   afficheDetail(personnel: Personnel, menu: string) {
     if (personnel === this.personnelService.getPersonnelOnglet(menu)) {
      this.personnelService.setPersonnelOnglet(menu, null);
      this.hover = true;
     }else {
      this.personnelService.setPersonnelOnglet(menu, personnel);
      this.hover = false;
     }
  }
  getCritereRechercheService() {
    return this.critereRechercheService;
  }
  initPersonnelsOnglet(menus: string[]) {
    const PersonnelsOnglet = new Map();
    for (const menu of menus) {
      PersonnelsOnglet.set(menu, null);
    }
    return  PersonnelsOnglet;
  }
  getPersonnelService() {
    return this.personnelService;
  }
  getkeys(myMap: Map<string, string[]>) {
   return Array.from(Object.keys(myMap));
  }
  getPersonnelSystemeInf(systemInf: string) {
    for ( const personnnel of this.personnelRecord.personnels) {
      if (personnnel.systemeInf === systemInf) {
        return personnnel;

      }

    }
  }

}
