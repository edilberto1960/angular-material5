import { filter, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
// import { filter } from '../../../../node_modules/rxjs/internal/operators/filter';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: string ;

  constructor(
    private router: Router,
    public title: Title,
    public meta: Meta
   ) {

   this.getDataRoute()
    .subscribe(events => {
      // console.log(events);
      this.label = events.titulo;
      this.title.setTitle(this.label);
    });
   }

    ngOnInit() {
    }

  //   this.getDataRoute()
  //     .subscribe( data => {

  //       this.label = data.titulo;
  //       this.title.setTitle( this.label );

  //       let metaTag: MetaDefinition = {
  //         name: 'description',
  //         content: this.label
  //       };

  //       this.meta.updateTag(metaTag);

  //     });

  // }

   getDataRoute() {
      return this.router.events.pipe(
          filter( evento => evento instanceof ActivationEnd),
          filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
          map( (event: ActivationEnd) => event.snapshot.data)
        );
  }


  

}
