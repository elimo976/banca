import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperazioneComponent } from './operazione.component';

describe('OperazioneComponent', () => {
  let component: OperazioneComponent;
  let fixture: ComponentFixture<OperazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperazioneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
