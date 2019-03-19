import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    async delay(timeInMs: number) {
        return new Promise((resolve) => setTimeout(resolve, timeInMs));
    }

    public get<T>(obj: object, path: string): T | undefined {
        const index = path.split('.');
        let value = obj || {};
        let i = 0;

        for (; i < index.length; i++) {
            value = value[index[i]];

            if (value === null || typeof value !== 'object') {
                break;
            }
        }

        return index.length - 1 === i ? (value as any) : undefined;
    }

    public getWindow(): Window {
        return window;
    }

    public getColor(): string[] {
        return [];
    }

}
