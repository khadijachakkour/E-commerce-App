import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { IUser, IUserCredentials } from '../models/User';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign in user', () => {
    const mockCredentials: IUserCredentials = {
      email: 'test@example.com',
      password: 'password'
    };

    const mockUser: IUser = {
      id:'aaa',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password',
      role:'client'
    };

    service.signIn(mockCredentials).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/signin`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCredentials);
    req.flush(mockUser);
  });

  it('should sign out user', () => {
    service.signOut();
    service.getUser().subscribe(user => {
      expect(user).toBeNull();
    });
  });
});
