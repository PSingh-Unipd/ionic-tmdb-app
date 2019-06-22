import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DvdPage } from './dvd.page';

describe('DvdPage', () => {
  let component: DvdPage;
  let fixture: ComponentFixture<DvdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DvdPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DvdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
