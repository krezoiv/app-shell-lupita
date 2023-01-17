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
    name: 'Mantenimientos',
    url: '/dashboard',

    children: [
      {
        name: 'Usuarios',
        url: '/dashboard',
        children: [
          { name: 'Ver ', url: '/dashboard/usuarios/listado-usuarios' },
          { name: 'Modificar', url: '/dashboard/usuario/editar-usuario' },
          { name: 'Agregar', url: '/dashboard/usuario/agregar-usuario' }
        ],
      },
      {
        name: 'Infraestructura',
        url: '/dashboard',
        children: [{
          name: 'Mangueras', url: '',
          children: [
            { name: 'crear', url: '/dashboard/infrastructura/manguera/agregar-manguera' },
            { name: 'ver', url: '/dashboard/infrastructura/manguera/listar-mangueras' },
            { name: 'asignación', url: '/dashboard/infrastructura/manguera/asignacion-de-manguera' }]
        },
        {
          name: 'Combustibles', url: '',
          children: [
            { name: 'crear', url: '/dashboard/infrastructura/combustibles/agregar-combustible' },
            { name: 'ver', url: '/dashboard/infrastructura/combustibles/listado-combustibles' }]
        },
        {
          name: 'Bombas', url: '',
          children: [
            { name: 'crear', url: '/dashboard/infrastructura/dispensadores/agregar-dispensador' },
            { name: 'ver', url: '/dashboard/infrastructura/dispensadores/listado-dispensadores' }]
        },
        {
          name: 'Islas', url: '',
          children: [
            { name: 'crear', url: '/dashboard/infrastructura/islas/agregar-isla' },
            { name: 'ver', url: 'infrastructura/islas/listado-islas' }]
        },
        {
          name: 'Tanques', url: '',
          children:
            [{ name: 'crear', url: '/dashboard/infrastructura/tanques/agregar-tanque' },
            { name: 'ver', url: '/dashboard/infrastructura/tanques/listado-tanques' }]
        },
        {
          name: 'Lubricantes', url: '',
          children:
            [{ name: 'crear', url: '/dashboard/infrastructura/lubricantes/agregar-nuevo-lubricante' }]
        },
        ],
      },
    ],
  },
  {
    name: 'Cuadre de Bombas',
    url: '/dashboard',
    children: [
      { name: 'Digitar Bombas', url: '/dashboard/cuadres/digitalizacion-de-bombas' },
      { name: 'Cierre Ventas', url: '/dashboard/cuadres/cierre-de-ventas' },
      { name: 'Eliminar Numeración', url: '/dashboard/cuadres/eliminar-digitalizacion-de-bombas' },
      { name: 'Eliminar Cierre Ventas', url: '/dashboard/cuadres/eliminar-cierre-de-venta' }]

  },
  {
    name: 'Cuadre de Lubricantes',
    url: '/dashboard',
    children: [
      { name: 'Registro diario venta', url: '/dashboard/cuadres/registro-lubricante-por-dia' }]

  },
  {
    name: 'Compras',
    url: '/dashboard',
    children: [{
      name: 'Generar No. Orden', url: '/dashboard/compras/orden-de-pedido'
    },
    { name: 'Generar Factura', url: '/dashboard/compras/generar-factura' },
    { name: 'Pagar Factura', url: '/dashboard/compras/cierre-factura' },
    { name: 'Eliminar Orden', url: '/dashboard/compras/eliminar-orden-de-compra' },
    { name: 'Eliminar Factura Compra', url: '/dashboard/compras/eliminar-factura-de-compra' },
    ]

  },
  {
    name: 'Inventario',
    url: '/dashboard/inventario',
    children: [{
      name: 'Disponibilidad', url: '/dashboard/inventario'
    },
    { name: 'Lubricantes', url : '/dashboard/inventario/lubricantes'}
  ]
  }

]

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
      { name: 'Por Fechas', url: '/dashboard/reporteria/reporteVentasporFechas' },
      { name: 'Acumulador Ventas', url: '/dashboard/reporteria/acumulado-de-ventas' },],
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
  styleUrls: ['./sidebar.component.css'],

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
