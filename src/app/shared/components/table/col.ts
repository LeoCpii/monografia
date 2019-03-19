import { SafeHtml } from "@angular/platform-browser";

export interface Col {
    header: string;
    fn: (row: object) => string | SafeHtml;
    width?: number;
    click?: (row: object, col: object) => void;
    textAlign?: 'left' | 'center' | 'right';
    noWrap?: boolean;
}
