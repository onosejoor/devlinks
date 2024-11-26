"use client";

import { useContext } from "react";
import AddLink from "../components/AddLink";
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import NothingHere from "./NothingHere";
import { PlatformLink } from "../lib/Functions";
import { Context } from "../components/Context";
import { PiGithubLogoFill } from "react-icons/pi";
import AddLinkButton from "../components/AddLinkButton";
import SaveLinks from "../components/SaveLinks";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function LinkCreateSection({ data }: { data: PlatformLink[] }) {
  const { links, setLinks } = useContext(Context);

  function setContextLinks() {
    return setLinks((prev) => [
      ...prev,

      {
        id: prev.length + 1,
        name: "Github",
        icon: <PiGithubLogoFill size={"20px"} />,
        url: "https://github.com/",
        regex: "https://github.com/:username",
      },
    ]);
  }
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
  const { setNodeRef } = useDroppable({
    id: "droppable",
  });
  return (
    <>
      <form
        // action={save}
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
          <AddLinkButton links={links} setContextLinks={setContextLinks} />
        </div>
        <DndContext
          onDragEnd={handleDrag}
          sensors={sensors}
        >
          <div
            className="flex flex-col gap-10 min-h-[450px] md:max-h-[500px] no-scrollbar relative md:overflow-scroll"
            ref={setNodeRef}
          >
            <SortableContext
              items={links}
              strategy={verticalListSortingStrategy}
            >
              {links?.length > 0 ? (
                links.map((e, index) => {
                  return <AddLink platform={data} link={e} key={index} />;
                })
              ) : (
                <NothingHere />
              )}
            </SortableContext>
          </div>
        </DndContext>

        <hr className="text-lightPurple" />
        <SaveLinks disabled={links.length === 0} />
      </form>
    </>
  );
}
