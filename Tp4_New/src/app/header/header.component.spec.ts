import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { IUser } from '../models/User';
import { ActivatedRoute } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUser', 'signOut']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: spy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'mockedId' } } } }
      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data on initialization', () => {
    const mockUser: IUser = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123',role:'client' };
    userServiceSpy.getUser.and.returnValue(of(mockUser));

    component.ngOnInit();

    expect(component.user).toEqual(mockUser);
  });

  it('should toggle sign out menu', () => {
    component.showSignOutMenu = false;

    component.toggleSignOutMenu();
    expect(component.showSignOutMenu).toBe(true);

    component.toggleSignOutMenu();
    expect(component.showSignOutMenu).toBe(false);
  });

  it('should sign out user', () => {
    component.signOut();

    expect(userServiceSpy.signOut).toHaveBeenCalled();
    expect(component.showSignOutMenu).toBe(false);
  });
});
