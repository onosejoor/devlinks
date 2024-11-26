"use client";

import {
  FaCodepen,
  FaFacebook,
  FaFreeCodeCamp,
  FaLinkedin,
  FaStackOverflow,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa";
import PhoneMockup from "./Phone";
import LinkCreateSection from "./LinkCreateSection";
import { PiDevToLogoFill, PiGithubLogoFill } from "react-icons/pi";
import {
  SiCodewars,
  SiFrontendmentor,
  SiGitlab,
  SiHashnode,
} from "react-icons/si";
import { IoLogoTwitter } from "react-icons/io";
import { PlatformLink } from "../lib/Functions";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../components/Context";

export default function MainSection() {
  const data: PlatformLink[] = [
    {
      id: 1,
      name: "Github",
      icon: <PiGithubLogoFill size={"20px"} />,
      url: "https://github.com/",
      regex: "https://github.com/:username",
    },
    {
      id: 2,
      name: "Dev.to",
      icon: <PiDevToLogoFill size={"20px"} />,
      url: "https://dev.to/",
      regex: "https://dev.to/:username",
    },
    {
      id: 3,
      name: "Frontend Mentor",
      icon: <SiFrontendmentor size={"20px"} />,
      url: "https://www.frontendmentor.io/profile/",
      regex: "https://www.frontendmentor.io/profile/:username",
    },
    {
      id: 4,
      name: "Codewars",
      icon: <SiCodewars size={"20px"} />,
      url: "https://www.codewars.com/users/",
      regex: "https://www.codewars.com/users/:username",
    },
    {
      id: 5,
      name: "Gitlab",
      icon: <SiGitlab size={"20px"} />,
      url: "https://gitlab.com/",
      regex: "https://gitlab.com/:username",
    },
    {
      id: 6,
      name: "Hashnode",
      icon: <SiHashnode size={"20px"} />,
      url: "https://hashnode.com/@",
      regex: "https://hashnode.com/@:username",
    },
    {
      id: 7,
      name: "Twitter",
      icon: <IoLogoTwitter size={"20px"} />,
      url: "https://twitter.com/",
      regex: "https://twitter.com/:username",
    },
    {
      id: 8,
      name: "LinkedIn",
      icon: <FaLinkedin size={"20px"} />,
      url: "https://www.linkedin.com/in/",
      regex: "https://www.linkedin.com/in/:username",
    },
    {
      id: 9,
      name: "YouTube",
      icon: <FaYoutube size={"20px"} />,
      url: "https://www.youtube.com/@",
      regex: "https://www.youtube.com/@:username",
    },
    {
      id: 10,
      name: "Facebook",
      icon: <FaFacebook size={"20px"} />,
      url: "https://www.facebook.com/",
      regex: "https://www.facebook.com/:username",
    },
    {
      id: 11,
      name: "Twitch",
      icon: <FaTwitch size={"20px"} />,
      url: "https://www.twitch.tv/",
      regex: "https://www.twitch.tv/:username",
    },
    {
      id: 12,
      name: "Codepen",
      icon: <FaCodepen size={"20px"} />,
      url: "https://codepen.io/",
      regex: "https://codepen.io/:username",
    },
    {
      id: 13,
      name: "freeCodeCamp",
      icon: <FaFreeCodeCamp size={"20px"} />,
      url: "https://www.freecodecamp.org/news/author",
      regex: "https://www.freecodecamp.org/news/author/:username",
    },
    {
      id: 14,
      name: "StackOverflow",
      icon: <FaStackOverflow size={"20px"} />,
      url: "https://stackoverflow.com/users/",
      regex: "https://stackoverflow.com/users/:username",
    },
  ];
  const [links, setLinks] = useState<PlatformLink[]>([]);

  // useEffect(() => {
  //   if (
  //     localStorage.getItem("links") &&
  //     JSON.parse(localStorage.getItem("links") || "[]")
  //   ) {
  //     const lyri: PlatformLink[] | null = JSON.parse(
  //       localStorage.getItem("links") || "[]"
  //     );
  //     setLinks(lyri || []);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (initial.current) {
  //     initial.current = false;
  //     return;
  //   }
  //   localStorage.setItem("links", JSON.stringify(links));
  // }, [links]);

  return (
    <>
      <main className="flex gap-[30px]  my-5">
          <Context.Provider value={{ links, setLinks }}>
            <PhoneMockup links={links} />
            <LinkCreateSection data={data} />
          </Context.Provider>
      </main>
    </>
  );
}
