// COMPONENTE
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
// MODELO
import { Product } from 'src/app/models/product';
import { Usuario } from './../../models/usuario';
import { Nole } from 'src/app/models/nole';
// SERVICIOS
import { ProductService } from 'src/app/shared/product.service';
import { LoginService } from 'src/app/shared/login.service';
import { MessageService } from 'src/app/shared/message.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  public usuarioActual = new Usuario(null, null, null, null, null, null, null, null, null)
  public product = new Product(null, null, null, null, null, null, null)
  public products: any;
  public idProducto: number;
  public categoriaActual: any;
  public usuario = new Usuario(null, null, null, null, null, null, null, null, null)
  
  constructor(
    public productService: ProductService, 
    public loginService: LoginService, 
    public messageService:MessageService, 
    private router:Router, 
    private toastr: ToastrService) {
    this.usuarioActual = this.loginService.usuarioActual;
  }

  // METODOS
  public mostrarProductos() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data
      console.log(data)
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.productService.usuarioActual = null;
        this.loginService.forcedLogout();
      }
    })
  }

  public mostrarProductosPorUsuario(uid) {
    this.productService.getProductsByUser(uid).subscribe((data) => {
      this.products = data
      console.log(data)
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.loginService.forcedLogout();
      }
    })
  }

  public pasarIdOwner(oid) {
    this.productService.ownerActual = oid
    console.log(this.productService.ownerActual)
  }
  
  public buscarPorUbicacion(tipo: string, valor: any) {
    console.log("Buscar en ubicacion")
    this.productService.getProductsBySelectedCategoryAndLocation(tipo, valor).subscribe((data) => {
      this.productService.products = data
      console.log(data)
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.loginService.forcedLogout();
      }
    })
  }
  
  public buscarPorDias(dias: number) {
    console.log("Buscar por dias")
    this.productService.getProductsBySelectedCategoryAndDays(dias).subscribe((data) => {
      this.productService.products = data
      console.log(data)
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.loginService.forcedLogout();
      }
    })
  }
  
  buscarUsuario(nombreUsuario){
    console.log("Buscar usuario ", nombreUsuario)
    this.productService.getOwnerByName(nombreUsuario).subscribe((data) => {
      this.productService.ownerActual = data[0].user_id;
      console.log(this.productService.ownerActual);
      this.router.navigate(["/owner"])
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.loginService.forcedLogout();
      }
    })
  }
  
  public pasarIdProducto(pid) {
    this.idProducto = pid
    console.log(this.idProducto)
  }
  
  public relacionarProductoMensaje(pid) {
    let uid = this.loginService.usuarioActual.user_id;
    this.productService.idProductoSeleccionado=pid;
    let newNole = new Nole(uid, pid);
    this.messageService.postNole(newNole).subscribe((data) => {
      console.log(data)
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.loginService.forcedLogout();
      }
    })
    this.messageService.noleSeleccionado = newNole;
  }
  
  ngOnInit(): void {}
  
}

