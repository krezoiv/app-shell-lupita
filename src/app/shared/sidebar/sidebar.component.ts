import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Component, Input, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

interface FoodNode {
  name: string;
  children?: FoodNode[];
  url: string  
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Ventas',
    url: '/dashboard',
    children: [{name: 'Por No. Documento', url:'/dashboard/inventario'}, {name: 'Por Fechas', url:'/dashboard/inventario'}],
  },
  {
    name: 'Compras',
    url:'/dashboard',
    children: [{name: 'Por No. Documento', url:'/dashboard/inventario'}, {name: 'Por Fechas', url:'/dashboard/inventario'}],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  url: string
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      url: node.url
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  title = "Sell Lupita";
  opened = true;

  constructor(

    private authService: AuthService,
    private router : Router,
  ) { 
    this.dataSource.data = TREE_DATA;
  }

  @Input() userName!: string

  date: number = Date.now();
  hour: any
  ngOnInit(): void {
    this.showHour();
  }

  logOut() {
    this.authService.logOut();
  }

  showHour() {
    this.hour = new Date();

    setInterval(() => {
      this.hour = new Date();
    }, 1000);
  }

}
