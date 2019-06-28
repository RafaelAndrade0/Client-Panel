import {
  trigger,
  animate,
  transition,
  style,
  query,
  state
} from "@angular/animations";

export const fadeAnimation = trigger("fadeAnimation", [
  state(
    "void",
    style({
      opacity: 0
    })
  ),
  transition("void <=> *", animate(1000))
]);
