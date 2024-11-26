"use client";
import {
  ChangeEvent,
  CSSProperties,
  useContext,
  useEffect,
  useState,
} from "react";
import { PlatformLink } from "../lib/Functions";
import { Context } from "./Context";
import Platform from "./Platforms";
import { useSortable } from "@dnd-kit/sortable";
import Toast from "./Toast";

type Link = {
  platform?: PlatformLink[];
  link: PlatformLink;
};

export default function AddLink({ platform, link }: Link) {
  const [open, setOpen] = useState(false);
  const { links, setLinks } = useContext(Context);
  const [focus, setFocus] = useState(false);

  function setSelectedLinks(props: PlatformLink) {
    setLinks((prev) => {
      return prev.map((pre) => {
        return pre.id === link.id
          ? {
              ...pre,
              icon: props.icon,
              name: props.name,
              url: props.url,
            }
          : pre;
      });
    });
  }

  function deleteLink() {
    const filter = links.filter((pre) => {
      return pre.id !== link.id;
    });
    setLinks(() => {
      return filter.map((l) => {
        return { ...l, id: link.id < l.id ? l.id - 1 : l.id };
      });
    });

    return <Toast message="hello" />;
  }

  function changeOnText(e: ChangeEvent<HTMLInputElement>) {
    setLinks((prev) => {
      return prev.map((pre) => {
        return pre.id === link.id
          ? { ...pre, input: e.target.value, error: "" }
          : pre;
      });
    });
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: link.id,
    animateLayoutChanges: ({ isSorting, wasDragging }) => isSorting || false,
  });

  const style: CSSProperties = {
    transform: `translatey(${transform?.y || 0}px)`,
    transition: transition,
    zIndex: isDragging || open ? 1000 : "auto",
  };

  useEffect(() => {
    if (isDragging) {
      setOpen(false);
    }
  }, [isDragging, open]);

  return (
    <>
      <Toast message="hhsvshvsj" />
      <div
        ref={setNodeRef}
        style={style}
        className="bg-veryLightGray rounded-md p-5"
      >
        <div
          className="flex justify-between items-center mb-5 cursor-grab"
          {...attributes}
          {...listeners}
        >
          <div className="flex gap-2 items-center font-bold text-gray">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="6"
                fill="none"
                viewBox="0 0 12 6"
              >
                <path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z" />
              </svg>
            </span>
            Link #{link.id}
          </div>
          <button
            type="button"
            onClick={deleteLink}
            className="bg-transparent hover:underline border-none text-darkGray"
          >
            Remove
          </button>
        </div>
        <div className="flex flex-col  gap-5">
          <div className="grid gap-1 relative">
            <label htmlFor="platform" className="text-darkGray">
              Platform
            </label>
            <div
              className={`flex py-2 px-3 items-center cursor-pointer border-1 bg-white rounded-lg border-lightGray  justify-between ${
                open && "shadow-ogColor border border-ogColor"
              }`}
              onClick={() => {
                setOpen(!open);
              }}
              onBlur={() => setOpen(false)}
            >
              <div className="flex gap-2 items-center">
                <span className="*:fill-darkGray group-hover/platform:*:fill-ogColor">
                  {link?.icon}
                </span>
                <p className="text-darkGray text-lg font-medium group-hover/platform:text-ogColor">
                  {" "}
                  {link?.name}
                </p>
              </div>
              <svg
                viewBox="0 0 24 24"
                className={`fill-ogColor ${
                  open && "rotate-180"
                } h-[30px] transition-transform`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"></path>{" "}
                </g>
              </svg>
            </div>
            {open && (
              <>
                <div className="absolute overflow-y-auto no-scrollbar z-[1000] shadow-darkGray shadow-lg h-[300px] top-full rounded-md bg-white w-full p-5 grid gap-5 mt-6">
                  {platform?.map((plat: PlatformLink, index: number) => {
                    return (
                      <Platform
                        key={plat.id || index}
                        setOpen={setOpen}
                        setSelectedLinks={setSelectedLinks}
                        plat={plat}
                        name={link.name}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="platform" className="text-darkGray">
              Link
            </label>
            <div
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              className={`cursor-pointer flex ${
                focus && "shadow-ogColor border border-ogColor"
              } items-center gap-3 px-3 bg-white border border-lightGray rounded-md ${
                link.error && "border-red"
              }`}
            >
              <span className="self-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#737373"
                    d="M8.523 11.72a.749.749 0 0 1 0 1.063l-.371.371A3.751 3.751 0 1 1 2.847 7.85l1.507-1.506A3.75 3.75 0 0 1 9.5 6.188a.753.753 0 0 1-1 1.125 2.25 2.25 0 0 0-3.086.091L3.908 8.91a2.25 2.25 0 0 0 3.183 3.183l.37-.371a.748.748 0 0 1 1.062 0Zm4.63-8.874a3.756 3.756 0 0 0-5.305 0l-.371.37A.751.751 0 1 0 8.539 4.28l.372-.37a2.25 2.25 0 0 1 3.182 3.182l-1.507 1.507a2.25 2.25 0 0 1-3.086.09.753.753 0 0 0-1 1.125 3.75 3.75 0 0 0 5.144-.152l1.507-1.507a3.756 3.756 0 0 0 .002-5.307v-.001Z"
                  />
                </svg>
              </span>
              <input
                type="url"
                onChange={changeOnText}
                name="input"
                value={link.input || ""}
                className={`bg-transparent py-3 w-full h-full cursor-pointer outline-none border-0 placeholder:text-lightGray`}
                placeholder={`eg. ${link.url + "johnappleseed"}`}
              />
              {link.error && (
                <p className="text-red self-center whitespace-nowrap">
                  {link.error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
