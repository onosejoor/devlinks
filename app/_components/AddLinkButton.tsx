export default function AddLinkButton({
  disabled,
  setContextLinks,
}: {
  disabled: boolean;
  setContextLinks: () => void;
}) {
  return (
    <button
      onClick={() => setContextLinks()}
      type="button"
      className="border hover:bg-veryLightPurple disabled:bg-veryLightGray disabled:text-lightGray disabled:cursor-not-allowed border-ogColor rounded-md text-ogColor py-2 font-bold"
      disabled={disabled}
    >
      + Add new link
    </button>
  );
}
