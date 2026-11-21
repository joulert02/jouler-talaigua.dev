// A pile whose top sheet (its last child) peels away and goes to the bottom, shared by NowNotes and TalksStack.
// The pile's CSS moves the sheet out while it carries `leavingClass`.
// A pile is a button named by its label, which replaces what it holds for assistive technology: each pile says the
// sheet now on top in a status line beside it.

/** How long the sheet takes to leave before it is put under the pile, in milliseconds. */
const LEAVE = 260;

/** Returns the sheet left on top, or nothing when the pile did not move. */
export function peel(pile: Element, leavingClass: string) {
  const top = pile.lastElementChild;
  if (!top || pile.childElementCount < 2 || top.classList.contains(leavingClass)) return;
  top.classList.add(leavingClass);
  setTimeout(() => {
    pile.prepend(top);
    requestAnimationFrame(() => top.classList.remove(leavingClass));
  }, LEAVE);
  return top.previousElementSibling;
}
