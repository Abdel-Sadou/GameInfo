import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone(
      {
        setHeaders : {
          'x-rapidapi-key' : '74b0aceafamshb62ac2ed1dba444p18ecb7jsnecd67e34d79b',
          'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
        },
        setParams : {
          key : 'bda9f3a012784709a8a742d39f44d7b5'
        }
      }
    )
    return next.handle(req);
  }

}
