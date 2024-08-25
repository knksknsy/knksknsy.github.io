import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'assetType'
})
export class AssetTypePipe implements PipeTransform {

	transform(value: string, args: string): boolean {
		return value.endsWith(args);
	}

}
