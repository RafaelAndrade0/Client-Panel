import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {
  dropdownMenu: HTMLElement;

  @HostListener("click") toggleShow() {
    this.dropdownMenu.classList.toggle("show");
  }

  constructor(private dropDownButton: ElementRef) {}

  ngOnInit(): void {
    this.dropdownMenu = this.dropDownButton.nativeElement.querySelector(
      ".dropdown-menu"
    );
  }
}
