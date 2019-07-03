import { Directive, HostListener, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {
  dropdownMenu: HTMLElement;

  @HostListener("click") toggleShow() {
    this.dropdownMenu.classList.toggle("show");
  }

  constructor(
    private dropDownButton: ElementRef, // verificar o _
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.dropdownMenu = this.dropDownButton.nativeElement.querySelector(
      ".dropdown-menu"
    );
    // this.renderer.addClass(this.dropDownButton.nativeElement, ".dropdown-menu");
  }
}
