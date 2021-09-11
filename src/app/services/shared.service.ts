import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
	HoldLoginObject:Object
  constructor(private _http: HttpClient) { }
  public subject = new BehaviorSubject<boolean>(false)
  Refresh(): Observable<any> {
    return this.subject.asObservable()
  }
	post(url: string, postData: any = {}) {
		return this._http.post<any>(url, postData)
			.pipe(map((data: any) => {
				return data;
			}));
	}


}
