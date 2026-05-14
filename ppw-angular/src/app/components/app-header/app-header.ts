import { computeMsgId } from '@angular/compiler';
import { ChangeDetectionStrategy, Component,computed,signal } from '@angular/core';

@Component({
  selector: 'app-app-header',
  imports: [],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {

  readonly brand = signal("ppw Angular")
  readonly showInfo = signal(false);
  readonly toggleLabel = computed(() => this.showInfo() ? "Ocultar informacion" : "Mostrar información");


  changeBrand(): void{
    //actualiar el valor de la señal brand
    this.brand.update((valor) => valor + "!");
  }
  resetBrand(): void{
    this.brand.set("ppw Angular");
  }
  toggleInfo(): void{
    this.showInfo.update((valor) => !valor);
  }
}

