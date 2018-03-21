import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {CritereRechercheService} from '../critereRecherche'
import {RepresentantLegal} from '.'
import {ActivatedRoute, Router} from '@angular/router'
import {RepresentantLegalService} from './representant-legal.service'

@Component({ 
  selector: 'jhi-representant-legal-detail',
  templateUrl: './representant-legal-detail.component.html',
  styles: []
})
export class RepresentantLegalDetailComponent implements OnInit {
  subscription:Subscription;
  siDetail:string
  representantLegal:RepresentantLegal
  constructor(private critereRechercheService:CritereRechercheService,
    private representantLegalService:RepresentantLegalService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.subscription=this.activatedRoute.queryParams.subscribe((params) => {
      if(params['siDetail']!==undefined){
        this.siDetail=params['siDetail']
      }
    });
    this.representantLegal=this.representantLegalService.getRepresentantLegal();
  }
  previousState() {
    if(this.critereRechercheService.getCritere().profil==='Représentants légaux'){
      this.critereRechercheService.getCritere().profil='representantLegal'
    }
    this.router.navigate([this.critereRechercheService.getCritere().profil],{skipLocationChange: true });
  }


}
