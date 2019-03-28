import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { ConfigService } from './config.service';
// import { CurrentUserService } from './auth/current-user.service';

@Injectable({
    providedIn: 'root'
})
export class AjaxService {
    public readonly baseUrl = this.configService.baseUrl;

    constructor(private http: HttpClient,
        public storageService: StorageService,
        public configService: ConfigService,
        // public currentUserService: CurrentUserService,
    ) { }

    public formatUrl(url: string): string {
        // const USID = this.currentUserService.usid ? 'USID=' + this.currentUserService.usid : '';

        const separador = url.indexOf('?') >= 0 ? '&' : '?';
        // if (url.indexOf('http') === 0) {
        //     return url + separador + USID;
        // }

        if (url[0] !== '/') {
            url = '/' + url;
        }

        // return this.baseUrl + url + separador + USID;
        return this.baseUrl + url + separador;
    }

    public async get<T>(url: string, params: { [param: string]: string | string[] } = {}) {
        url = this.formatUrl(url);

        const headers = {
            'Content-Type': 'application/json'
         };
        return this.http.get<T>(url, { params }).toPromise();
    }

    public async post<T>(url: string, body: any = {}) {
        url = this.formatUrl(url);

        const options = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                // 'Authorization': `Bearer ${this.currentUserService.accessToken}`
            }
        };

        return this.http.post<T>(url, body, options).toPromise();
    }


    public async downloadFile<T>(url: string, body: any = {}, type: string) {
        url = this.formatUrl(url);

        const options = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                // 'Authorization': `Bearer ${this.currentUserService.accessToken}`
            },
            responseType: 'text' as 'text'
        };

        return this.http.post(url, body, options).toPromise();
    }

    public async postForm<T>(url: string, params: { [param: string]: any } = {}) {
        url = this.formatUrl(url);

        const options = {};

        const body = new FormData();
// tslint:disable-next-line: forin
        for (const paramName in params) {
            body.set(paramName, params[paramName]);
        }

        return this.http.post<T>(url, body, options).toPromise();
    }

    public async put<T>(url: string, body: any = {}) {
        url = this.formatUrl(url);

        const options = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                // 'Authorization': `Bearer ${this.currentUserService.accessToken}`
            }
        };

        return this.http.put<T>(url, body, options).toPromise();
    }

    public async delete<T>(url: string) {
        url = this.formatUrl(url);

        const options = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                // 'Authorization': `Bearer ${this.currentUserService.accessToken}`
            }
        };

        return this.http.delete<T>(url, options).toPromise();
    }
}
