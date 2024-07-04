import { Injectable, effect, inject, signal, untracked } from '@angular/core';
import { Theme, ThemeService } from 'primeng/themes';
import { BaseStyle } from 'primeng/base';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeProvider {
    // @todo define type for theme
    theme = signal<any>(undefined);

    isThemeChanged: boolean = false;

    public document: Document = inject(DOCUMENT);

    baseStyle: BaseStyle = inject(BaseStyle);

    constructor() {
        // effect(
        //     () => {
        //         ThemeService.on('theme:change', (newTheme) => {
        //             this.isThemeChanged = true;
        //             // this.theme.set(newTheme);
        //             this.onThemeChange(this.theme());
        //             console.log('changed');
        //         });
        //         // untracked(() => this.theme());
        //     },
        //     { allowSignalWrites: true }
        // );
        // effect(
        //     () => {
        //         if (this.document && this.theme() && !this.isThemeChanged) {
        //             this.onThemeChange(this.theme());
        //             this.isThemeChanged = false;
        //         }
        //     },
        //     { allowSignalWrites: true }
        // );
        effect(
            () => {
                ThemeService.on('theme:change', (newTheme) => {
                    untracked(() => {
                        this.isThemeChanged = true;
                        this.theme.set(newTheme);
                        // this.onThemeChange(this.theme());
                    });
                });
            },
            { allowSignalWrites: true }
        );
        effect(() => {
            const themeValue = this.theme();
            if (this.document && themeValue) {
                if (!this.isThemeChanged) {
                    this.onThemeChange(themeValue);
                }
                this.isThemeChanged = false;
            }
        });
    }

    onThemeChange(value: any) {
        Theme.setTheme(value);
        if (this.document) {
            this.loadCommonTheme();
        }
    }

    loadCommonTheme() {
        // common
        if (!Theme.isStyleNameLoaded('common')) {
            const { primitive, semantic } = this.baseStyle.getCommonTheme?.() || {};
            const styleOptions = { nonce: undefined };
            this.baseStyle.load(primitive?.css, { name: 'primitive-variables', ...styleOptions });
            this.baseStyle.load(semantic?.css, { name: 'semantic-variables', ...styleOptions });
            this.baseStyle.loadTheme({ name: 'global-style', ...styleOptions });

            Theme.setLoadedStyleName('common');
        }
    }
}
