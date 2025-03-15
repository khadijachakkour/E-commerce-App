import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { CatalogNavigationComponent } from './catalog-navigation.component';

describe('CatalogNavigationComponent', () => {
  let component: CatalogNavigationComponent;
  let fixture: ComponentFixture<CatalogNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[CatalogNavigationComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
