import { PlatformLink } from "../lib/Functions";

export default function AddLinkButton({
  links,
  setContextLinks,
}: {
  links: PlatformLink[];
  setContextLinks: () => void;
}) {
  return (
    <button
      onClick={() => setContextLinks()}
      type="button"
      className="border hover:bg-veryLightPurple disabled:bg-veryLightGray disabled:text-lightGray disabled:cursor-not-allowed border-ogColor rounded-md text-ogColor py-2 font-bold"
      disabled={links.length < 5 ? false : true}
    >
      + Add new link
    </button>
  );
}
