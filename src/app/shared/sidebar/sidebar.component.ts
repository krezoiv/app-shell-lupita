import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Component, Input, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


interface SideBarNodeModule {
  name: string;
  children?: SideBarNodeModule[];
  url: string
}

const TREE_DATA_MODULE: SideBarNodeModule[] = [
  {
    name: 'Mantenimiento',
    url: '/dashboard',
    children: [
      { name: 'Por No. Documento', url: '/dashboard/reporteria/reporteVentasporDocumento' },
      { name: 'Por Fechas', url: '/dashboard/reporteria/reporteVentasporFechas' }],
  },
  {
    name: 'Cuadres',
    url: '/dashboard',
    children: [
      { name: 'Por No. Orden', url: '/dashboard/reporteria/reporteComprasporNumeroDeOrden' },
      { name: 'Por Fechas', url: '/dashboard/reporteria/reporteComprasporFechas' }
    ],
  },
  {
    name: 'Compras',
    url: '/dashboard',
    children: [
      { name: 'Por No. Orden', url: '/dashboard/reporteria/reporteComprasporNumeroDeOrden' },
      { name: 'Por Fechas', url: '/dashboard/reporteria/reporteComprasporFechas' }
    ],
  },
  {
    name: 'Inventario',
    url: '/dashboard',
    children: [
      { name: 'Por No. Orden', url: '/dashboard/reporteria/reporteComprasporNumeroDeOrden' },
      { name: 'Por Fechas', url: '/dashboard/reporteria/reporteComprasporFechas' }
    ],
  },
];

interface SideBarFlatNodeModule {
  expandable: boolean;
  name: string;
  level: number;
  url: string
}



interface SideBarNodeReporting {
  name: string;
  children?: SideBarNodeReporting[];
  url: string
}

const TREE_DATA: SideBarNodeReporting[] = [
  {
    name: 'Ventas',
    url: '/dashboard',
    children: [
      { name: 'Por No. Documento', url: '/dashboard/reporteria/reporteVentasporDocumento' },
      { name: 'Por Fechas', url: '/dashboard/reporteria/reporteVentasporFechas' }],
  },
  {
    name: 'Compras',
    url: '/dashboard',
    children: [
      { name: 'Por No. Orden', url: '/dashboard/reporteria/reporteComprasporNumeroDeOrden' },
      { name: 'Por Fechas', url: '/dashboard/reporteria/reporteComprasporFechas' }
    ],
  },
];

interface SideBarFlatNodeReporting {
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
  
  
  private _transformerModule = (node: SideBarNodeModule, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      url: node.url
    };
  };

  treeControlModule = new FlatTreeControl<SideBarFlatNodeModule>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattenerModule = new MatTreeFlattener(
    this._transformerModule,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSourceModule = new MatTreeFlatDataSource(this.treeControlModule, this.treeFlattenerModule);

  hasChildModule = (_: number, node: SideBarFlatNodeModule) => node.expandable;
    
  //-----
  
  private _transformer = (node: SideBarNodeReporting, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      url: node.url
    };
  };

  treeControl = new FlatTreeControl<SideBarFlatNodeReporting>(
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

  hasChild = (_: number, node: SideBarFlatNodeReporting) => node.expandable;

  title = "Sell Lupita";
  opened = true;

  constructor(

    private authService: AuthService,
    private router: Router,
  ) {
    this.dataSource.data = TREE_DATA;
    this.dataSourceModule.data = TREE_DATA_MODULE;

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
