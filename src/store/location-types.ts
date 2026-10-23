/* -------------------------------------------------------------------------- */
/*  Primitives                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Tailwind position utilities, e.g. "top-10 left-5", "top-[5vh] left-5".
 * Always a vertical anchor followed by a horizontal anchor.
 */
export type PositionClass =
  `${"top" | "bottom"}-${string} ${"left" | "right"}-${string}`;

export type LocationType = "work" | "about" | "resume" | "trash";

export type FileType = "txt" | "url" | "img" | "fig" | "pdf";

/* -------------------------------------------------------------------------- */
/*  Shared bases                                                              */
/* -------------------------------------------------------------------------- */

interface NodeBase {
  id: number; // unique among siblings only, not globally
  name: string;
  icon: string;
}

interface FileBase extends NodeBase {
  kind: "file";
}

/** Icon position inside the Finder window. */
interface Positioned {
  position: PositionClass;
}

/* -------------------------------------------------------------------------- */
/*  Files (discriminated union on `fileType`)                                 */
/* -------------------------------------------------------------------------- */

export interface TxtFile extends FileBase, Positioned {
  fileType: "txt";
  description: string[]; // one entry per paragraph
  subtitle?: string;
  image?: string;
}

export interface UrlFile extends FileBase, Positioned {
  fileType: "url";
  href: string;
}

export interface ImgFile extends FileBase, Positioned {
  fileType: "img";
  imageUrl: string;
}

export interface FigFile extends FileBase, Positioned {
  fileType: "fig";
  href: string;
}

export interface PdfFile extends FileBase, Partial<Positioned> {
  fileType: "pdf";
  href?: string; // hosted resume path, optional for now
}

export type FinderFile = TxtFile | UrlFile | ImgFile | FigFile | PdfFile;

/** Pick one file variant by its `fileType`, e.g. FileOfType<"img"> */
export type FileOfType<T extends FileType> = Extract<
  FinderFile,
  { fileType: T }
>;

/* -------------------------------------------------------------------------- */
/*  Folders                                                                   */
/* -------------------------------------------------------------------------- */

/** A folder nested inside a location (e.g. one project under "Work"). */
export interface ProjectFolder extends NodeBase, Positioned {
  kind: "folder";
  windowPosition: PositionClass; // where its Finder window opens
  children: FinderFile[];
}

export type FinderNode = FinderFile | ProjectFolder;

/* -------------------------------------------------------------------------- */
/*  Top-level locations (sidebar entries)                                     */
/* -------------------------------------------------------------------------- */

interface LocationBase<T extends LocationType> extends NodeBase {
  kind: "folder";
  type: T;
}

export interface WorkLocation extends LocationBase<"work"> {
  children: ProjectFolder[];
}

export interface AboutLocation extends LocationBase<"about"> {
  children: (ImgFile | TxtFile)[];
}

export interface ResumeLocation extends LocationBase<"resume"> {
  children: PdfFile[];
}

export interface TrashLocation extends LocationBase<"trash"> {
  children: ImgFile[];
}

export interface Locations {
  work: WorkLocation;
  about: AboutLocation;
  resume: ResumeLocation;
  trash: TrashLocation;
}

/** Any one of the four locations. */
export type FinderLocation = Locations[LocationType];

/** Anything that can appear directly inside a location. */
export type LocationChild = FinderLocation["children"][number];

/*
 * Usage:
 *
 *   export const locations: Locations = {
 *     work: WORK_LOCATION,
 *     about: ABOUT_LOCATION,
 *     resume: RESUME_LOCATION,
 *     trash: TRASH_LOCATION,
 *   };
 */
