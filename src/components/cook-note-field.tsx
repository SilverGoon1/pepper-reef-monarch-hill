import type { RefObject } from "react";

/** Uncontrolled so typing never remounts or steals focus from the cook note. */
export function CookNoteField({
  id,
  noteRef,
  placeholder,
}: {
  id: string;
  noteRef: RefObject<HTMLTextAreaElement | null>;
  placeholder: string;
}) {
  return (
    <div className="ed-field pizza-modal-block pizza-cook-field">
      <label htmlFor={id}>Note for the cook</label>
      <textarea
        id={id}
        ref={noteRef}
        className="ed-input ed-area"
        rows={2}
        maxLength={160}
        defaultValue=""
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="on"
        spellCheck
        enterKeyHint="done"
        onPointerDown={(e) => e.stopPropagation()}
        onFocus={(e) => {
          const el = e.currentTarget;
          window.requestAnimationFrame(() => el.scrollIntoView({ block: "center", inline: "nearest" }));
        }}
      />
    </div>
  );
}

export function cookNoteValue(ref: RefObject<HTMLTextAreaElement | null>) {
  return (ref.current?.value ?? "").trim().slice(0, 160);
}
