"use client";

import { Suspense, useContext } from "react";
import dynamic from "next/dynamic";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { PiGithubLogoFill } from "react-icons/pi";

import { showToast } from "@/app/_hooks/useToast";
import { insertLink } from "../../_lib/functions";

import { Context } from "../../_components/Context";

import AddLinkButton from "../../_components/AddLinkButton";
import SaveLinks from "../../_components/SaveLinks";
import PlatformLoader from "./PlatformLoader";

const AddLink = dynamic(() => import("./AddLink"), {
  ssr: false,
  loading: () => <PlatformLoader />,
});
const NothingHere = dynamic(() => import("../../_components/ui/NothingHere"));

export default function LinkCreateSection() {
  const { links, setLinks } = useContext(Context);

  function setContextLinks() {
    return setLinks((prev) => [
      ...prev,

      {
        id: prev.length + 1,
        name: "Github",
        icon: <PiGithubLogoFill size={"20px"} />,
        url: "",
        placeholder: "https://github.com/",
        regex: "https://github.com/:username",
      },
    ]);
  }

  function handleDrag({ active, over }: DragEndEvent) {
    // find index of array
    const find = (id: number) => links.findIndex((e) => e.id === id);

    if (active.id !== over?.id) {
      setLinks(() => {
        const oldIndex = find(active.id as number);
        const newIndex = find(over?.id as number);
        const newArray = arrayMove(links, oldIndex, newIndex);

        return newArray.map((link, index) => {
          return { ...link, id: index + 1 };
        });
      });
    }
  }

  function deleteLink(id: number) {
    console.log("hii");
    
    const filter = links.filter((pre) => {
      return pre.id !== id;
    });
    setLinks(() => {
      return filter.map((l) => {
        return { ...l, id: id < l.id ? l.id - 1 : l.id };
      });
    });
  }

  async function save() {
    const { success, message } = await insertLink(links);

    return showToast({
      saveIcon: true,
      message: message,
      variants: success ? "success" : "error",
    });
  }
  return (
    <>
      <form
        action={save}
        className="flex-1 flex flex-col gap-5 p-7 bg-white rounded-md"
      >
        <div className="flex flex-col  gap-10">
          <div className="grid gap-3">
            <h1 className="text-gray font-bold text-2xl">
              Customize your links
            </h1>

            <p className="text-darkGray">
              Add/edit/remove links below and then share all your profiles with
              the world
            </p>
          </div>
          <AddLinkButton
            disabled={links.length === 14}
            setContextLinks={setContextLinks}
          />
        </div>

        <DndContext onDragEnd={handleDrag}>
          <div className="flex flex-col gap-10 min-h-[450px] md:max-h-[500px] no-scrollbar relative md:overflow-scroll">
            <SortableContext
              items={links}
              strategy={verticalListSortingStrategy}
            >
              <Suspense fallback={<NothingHere />}>
                {links?.length ? (
                  links.map((link, index) => {
                    return (
                      <AddLink
                        setLinksAction={setLinks}
                        deleteAction={deleteLink}
                        link={link}
                        id={index + 1}
                        key={index}
                      />
                    );
                  })
                ) : (
                  <NothingHere />
                )}
              </Suspense>
            </SortableContext>
          </div>
        </DndContext>

        <hr className="text-lightPurple" />
        <SaveLinks disabled={links.length === 0} />
      </form>
    </>
  );
}
