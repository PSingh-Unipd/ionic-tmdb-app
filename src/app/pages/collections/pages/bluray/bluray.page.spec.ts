import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlurayPage } from './bluray.page';

describe('BlurayPage', () => {
  let component: BlurayPage;
  let fixture: ComponentFixture<BlurayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlurayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlurayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
