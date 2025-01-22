"use client";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";

import { ArrowDownIcon, DragIcon, LinkIcon } from "../../_components/ui/Icons";

import { PlatformLink } from "../../_lib/types";
import Platform from "./Platforms";
import FormInput from "../../_components/Forminput";
import { platforms } from "../../_components/PlatformIcons";

type LinkProps = {
  link: PlatformLink;
  id: number;
  deleteAction: (id: number) => void;
  setLinksAction: Dispatch<SetStateAction<PlatformLink[]>>;
};

export default function AddLink({
  link,
  id,
  deleteAction,
  setLinksAction: setLinks,
}: LinkProps) {
  const [open, setOpen] = useState(false);

  const icon = platforms.find((icon) => icon.name === link.icon || link.name)!;

  function setSelectedLinks(props: PlatformLink) {
    setLinks((prev) => {
      return prev.map((pre) => {
        return pre.id === link.id
          ? {
              ...pre,
              placeholder: props.placeholder,
              icon: props.icon,
              name: props.name,
              url: props.url,
              regex: props.regex,
            }
          : pre;
      });
    });
  }

  function changeOnText(e: ChangeEvent<HTMLInputElement>) {
    setLinks((prev) => {
      return prev.map((pre) => {
        return pre.id === link.id
          ? { ...pre, url: e.target.value, error: "" }
          : pre;
      });
    });
  }

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      animateLayoutChanges: ({ isSorting }) => isSorting || false,
    });

  const style = {
    transform: `translatey(${transform?.y || 0}px)`,
    transition: transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-veryLightGray rounded-md p-5"
    >
      <div className="flex justify-between items-center mb-5">
        <div {...attributes} {...listeners} className=" cursor-grab flex gap-2 items-center font-bold text-gray">
          <span>
            <DragIcon />
          </span>
          Link #{id}
        </div>
        <button
          type="button"
          onClick={() => deleteAction(link.id)}
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
                {icon?.icon}
              </span>
              <p className="text-darkGray text-lg font-medium group-hover/platform:text-ogColor">
                {link?.name}
              </p>
            </div>
            <div
              className={`${
                open ? "rotate-180" : "rotate-0"
              } transition-transform`}
            >
              <ArrowDownIcon />
            </div>
          </div>
          {open && (
            <div className="overflow-y-auto no-scrollbar z-[1000] shadow-darkGray shadow-lg h-[300px] top-full rounded-md bg-white w-full p-5 grid gap-5 mt-6">
              {platforms?.map((plat: PlatformLink, index: number) => {
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
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="platform" className="text-darkGray">
            Link
          </label>

          <FormInput
            error={link.error}
            name="url"
            type="url"
            action={changeOnText}
            value={`${link.url || ""}`}
            placeholder={`eg. ${link?.placeholder + "johnappleseed"}`}
            className="w-full"
            svg={<LinkIcon />}
          />
        </div>
      </div>
    </div>
  );
}
