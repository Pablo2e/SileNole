import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product';
import { LoginService } from 'src/app/shared/login.service';
import { Usuario } from 'src/app/models/usuario';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public usuarioActual=new Usuario(null,null,null,null,null,null,null,null,null)

  public product= new Product(null,null,null,null,null,null,null)
  public products: any[];
  public idProducto: number
  public modalRef: BsModalRef;

  constructor(public productService:ProductService, public loginService:LoginService, public modalService:BsModalService) {
    this.usuarioActual=this.loginService.usuarioActual
  }

  pasarIdProducto(numero){
    this.idProducto=numero
    console.log(this.idProducto)
  }
  
  onSubmit(form){
    console.log(form.value)
  }

  anyadirSile(nombre: string, descripcion: string, categoria: string, user_id: number, product_image: string){
    console.log('Hola desde anyadir')
    console.log(this.productService.product)
    let date = new Date();
    this.productService.postProduct(new Product(null, nombre, descripcion, categoria, user_id, product_image, date)).subscribe((data)=>{
      console.log(data)
    })
  }
  
  openModal(Upload: TemplateRef<any>){
    this.modalRef = this.modalService.show(Upload)
  }

  ngOnInit(): void {
  }

}
