import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarModule, MenubarModule, PanelModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'banca';

  items = [
    { label: 'Banca', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Conti', icon: 'pi pi-wallet', routerLink: '/conto' },
    { label: 'Operazioni', icon: 'pi pi-exchange', routerLink: '/operazioni' },
  ]
}
