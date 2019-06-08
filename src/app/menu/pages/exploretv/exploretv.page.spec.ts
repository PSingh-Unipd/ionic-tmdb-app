import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploretvPage } from './exploretv.page';

describe('ExploretvPage', () => {
  let component: ExploretvPage;
  let fixture: ComponentFixture<ExploretvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploretvPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploretvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
