import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksAllDetails } from './tasks-all-details';

describe('TasksAllDetails', () => {
  let component: TasksAllDetails;
  let fixture: ComponentFixture<TasksAllDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksAllDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksAllDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
