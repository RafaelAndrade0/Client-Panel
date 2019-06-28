import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propName: string): any {
    return value
      ? value.filter(
          item => item[propName].search(new RegExp(filterString, "i")) > -1
        )
      : [];
  }
}
