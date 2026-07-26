// Inline markup in `text` fields (reconstructed from the binary font-change table,
// mirroring the M1 source convention in parsed/scripts/extract_terminals.py):
//   $B..$b = bold        (well-nested, stack-parseable)
//   $I..$i = italic      (well-nested)
//   $U..$u = underline   (well-nested)
//   $Cn    = color, n = 0-7 — a persistent state, not nested (lasts until next $Cn; $C0 = default)
// Color palette (Aleph One InterfaceColors[], _computer_interface_text_color + n):
//   $C0 #00FF00 green (default)   $C1 #FFFFFF white        $C2 #FF0000 red
//   $C3 #009C00 dark green        $C4 #00B0C9 aqua (cyan)  $C5 #FFE700 yellow
//   $C6 #AF0000 dark red          $C7 #0C00FF blue

/** Root object of terminals.json. */
export interface TerminalsFile {
  chapters: Chapter[];
}

export interface Chapter {
  index: number;
  name: string;
  levels: Level[];
}

export interface Level {
  /** Level index (0..20), matching the `## Level N:` headers and map filename prefix. */
  index: number;
  /** Level name, e.g. "Arrival". */
  name: string;
  /** Path to the overhead map SVG (relative to parsed/), or null if none. */
  mapSvg: string | null;
  /** SVG viewBox as [minX, minY, width, height], or null if no map. */
  viewBox: [number, number, number, number] | null;
  terminals: Terminal[];
}

export interface Terminal {
  /** Terminal number within the level (0, 1, 2, 9, ...). */
  index: number;
  /** Terminal text resource id (1000, 1001, ...). */
  resourceId: number;
  /** The `;` comment/label line(s), joined by "\n", or null if none. */
  label: string | null;
  /** Shared logon screen, shown first regardless of completion state. */
  logon: LogonGroup;
  /**
   * Content branches selected by the level completion state when the terminal
   * is read (see computer_interface.cpp). `success`/`failure` fall back to
   * `unfinished` when null.
   */
  states: {
    /** Shown while the level is unfinished (also the default branch). */
    unfinished: ContentGroup[];
    /** Shown on success; null => falls back to `unfinished`. */
    success: ContentGroup[] | null;
    /** Shown on failure; null => falls back to `unfinished`. */
    failure: ContentGroup[] | null;
  };
}

/** Groups that may appear inside a state branch. */
export type ContentGroup =
  | InformationGroup
  | StateMarkerGroup
  | BriefingGroup
  | CheckpointGroup;

export interface LogonGroup {
  type: "logon";
  /** Logon-screen PICT resource id (varies per terminal: 1600, 1601, …), or null. */
  pict: number | null;
  /** Path to the extracted logon PICT image (relative to parsed_m2/), or null. */
  image: string | null;
  /** Raw text with inline markup preserved. */
  text: string;
}

export interface InformationGroup {
  type: "information";
  text: string;
}

/**
 * The text page attached to a `#unfinished` / `#success` / `#failure` divider
 * itself. Its `type` names which branch it opens; subsequent groups in the
 * same branch follow it in the array.
 */
export interface StateMarkerGroup {
  type: "unfinished" | "success" | "failure";
  text: string;
}

export interface BriefingGroup {
  type: "briefing";
  /** PICT resource id shown alongside the briefing text. */
  pict: number | null;
  /** Path to the extracted PICT image (relative to parsed_m2/), or null. */
  image: string | null;
  text: string;
}

export interface CheckpointGroup {
  type: "checkpoint";
  /** Map location to center on; resolved from the level SVG's `data-cp` marker. */
  checkpoint: Checkpoint;
  text: string;
}

export interface Checkpoint {
  /** Checkpoint index (the `#checkpoint N` argument / SVG `data-cp`). */
  index: number;
  /** Center X in SVG coordinates, or null if the index is absent from the SVG. */
  cx: number | null;
  /** Center Y in SVG coordinates, or null if absent. */
  cy: number | null;
  /** Marker radius in SVG units, or null if absent. */
  r: number | null;
}
