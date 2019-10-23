import {getTestBed, TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('UserService', () => {
  const user = {
    nom: 'test',
    prenom: 'test',
    birth_date: 'string',
    status: 'string',
    email: 'rr',
    user_picture_file: 'zzz',
    adress: 'aaa',
    country: 'aaa',
    phone: 'aaa',
    google_Id: 'rr',
    facebook_Id: 'aa',
    userPassword: '123'
  };
  let httpMock: HttpTestingController;
  let userService: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    httpMock = getTestBed().get(HttpTestingController);
    userService = getTestBed().get(UserService);
  });

  it('it is created', () => {
    expect(userService).toBeTruthy();
  });

  describe('#postUser()', () => {
    it('returned Observable should match the right data', () => {
      const mockUser = {
        nom: 'test',
        prenom: 'test',
        description: 'espace inscription user'
      };
      userService.postUser(user)
        .subscribe(formData => {
          expect(formData.nom).toEqual('test');
        });

      const req = httpMock.expectOne(userService.USERS_URL);
      expect(req.request.method).toEqual('POST');
      req.flush(mockUser);
    });
  });

  // describe('#loginUser()', () => {
  //   it('returned Observable should match the right data', () => {
  //     const mockUser = {
  //       info: 'Success operation',
  //     };
  //     userService.loginUser({token: 'xxxxx', Role: 'PARENT'})
  //       .then(user => {
  //         expect(user.token).toEqual('xxxxx');
  //       });
  //     const req = httpMock.expectOne(userService.AUTH_USER);
  //     expect(req.request.method).toEqual('POST');
  //     req.flush(mockUser);
  //   });
  // });

  // describe('#contactAdmin()', () => {
  //   it('returned Observable should match the right data', () => {
  //     const mockResponse = {
  //       token: 'xxxxx',
  //       description: 'get token to connect'
  //     };
  //     userService.contactAdmin('name', 'email@email.com', 'message').then(user => {
  //       // expect(user.token).toEqual('xxxxx');
  //     });
  //     const req = httpMock.expectOne(userService.Contact_Admin);
  //     expect(req.request.method).toEqual('POST');
  //     req.flush(mockResponse);
  //   });
  // });

  // describe('#validateAccount()', () => {
  //   it('returned Observable should match the right data', () => {
  //     userService.validateAccount('validateAccount');
  //     httpMock.expectNone(userService.USERS_URL + 'validateAccount');
  //   });
  // });
  //
  // describe('#sendResetEmail()', () => {
  //   it('returned Observable should match the right data', () => {
  //     userService.sendResetEmail('email@email.com');
  //     httpMock.expectNone(userService.USERS_URL + 'validateAccount');
  //   });
  // });
  //
  // describe('#verifyToken()', () => {
  //   it('returned Observable should match the right data', () => {
  //     userService.verifyToken(this.user, 'token');
  //     httpMock.expectNone("/users/verify-token");
  //   });
  // });
  //
  // describe('#verifyTokenNotExpired()', () => {
  //   it('returned Observable should match the right data', () => {
  //     userService.verifyTokenNotExpired();
  //     const req = httpMock.expectOne("/users/verifyTokenNotExpired");
  //     expect(req.request.method).toEqual('GET');
  //     req.flush(user);
  //   });
  // });
  //
  // describe('#resetPassword()', () => {
  //   const currentUser = {
  //     id: 1,
  //     nom: 'test',
  //     prenom: 'test',
  //     birth_date: 'string',
  //     status: 'string',
  //     email: 'rr',
  //     user_picture_file: 'zzz',
  //     adress: 'aaa',
  //     country: 'aaa',
  //     phone: 'aaa',
  //     google_Id: 'rr',
  //     facebook_id: 'aa',
  //     userPassword: '123'
  //   };
  //
  //   it('returned Observable should match the right data', () => {
  //     userService.resetPassword(currentUser);
  //     httpMock.expectNone("/users/verify-token");
  //   });
  // });
  //
  // describe('#getUser()', () => {
  //   it('returned Observable should match the right data', () => {
  //     userService.getUser(1);
  //     httpMock.expectNone("/users/verify-token");
  //   });
  // });


/*


  describe('#verifyToken()', () => {
    it('returned Observable should match the right data', () => {
      userService.verifyToken(this.user, 'token');
      const req = httpMock.expectOne("/users/verify-token");
      expect(req.request.method).toEqual('POST');
      req.flush(user);
    });
  });

*/
});
