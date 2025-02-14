import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'label-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                The position of the labels relative to the meters is defined using the <i>labelPosition</i> property. The default orientation of the labels is horizontal, and the vertical alternative is available through the
                <i>labelOrientation</i> option.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-metergroup [value]="value" labelPosition="start" labelOrientation="vertical" />
        </div>
        <app-code [code]="code" selector="meter-group-label-demo"></app-code>
    `
})
export class LabelDoc {
    value = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
    code: Code = {
        basic: `<p-metergroup [value]="value" labelPosition="start" labelOrientation="vertical" />`,

        html: `<div class="card">
    <p-metergroup [value]="value" labelPosition="start" labelOrientation="vertical" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MeterGroup } from 'primeng/metergroup';

@Component({
    selector: 'meter-group-label-demo',
    templateUrl: './meter-group-label-demo.html',
    standalone: true,
    imports: [MeterGroup]
})
export class MeterGroupLabelDemo {
    value = [
        { label: 'Apps', color: '#34d399', value: 16 },
        { label: 'Messages', color: '#fbbf24', value: 8 },
        { label: 'Media', color: '#60a5fa', value: 24 },
        { label: 'System', color: '#c084fc', value: 10 }
    ];
}`
    };
}
