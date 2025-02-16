import { Routes } from '@angular/router';
import { BancaComponent } from './banca/banca.component';
import { ContoComponent } from './conto/conto.component';
import { OperazioneComponent } from './operazione/operazione.component';

export const routes: Routes = [
  { path: '', component: BancaComponent },
  { path: 'conto', component: ContoComponent },
  { path: 'operazioni', component: OperazioneComponent }
];
