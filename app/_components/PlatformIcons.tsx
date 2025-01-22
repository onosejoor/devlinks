import {
  SiCodewars,
  SiFrontendmentor,
  SiGitlab,
  SiHashnode,
} from "react-icons/si";
import { IoLogoTwitter } from "react-icons/io";
import {
  FaCodepen,
  FaFacebook,
  FaFreeCodeCamp,
  FaLinkedin,
  FaStackOverflow,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa";
import { PiDevToLogoFill, PiGithubLogoFill } from "react-icons/pi";

import { PlatformLink } from "../_lib/types";

export const platforms: PlatformLink[] = [
  {
    id: 1,
    name: "Github",
    icon: <PiGithubLogoFill size={"20px"} />,
    placeholder: "https://github.com/",
    regex: "https://github.com/:username",
  },
  {
    id: 2,
    name: "Dev.to",
    icon: <PiDevToLogoFill size={"20px"} />,
    placeholder: "https://dev.to/",
    regex: "https://dev.to/:username",
  },
  {
    id: 3,
    name: "Frontend Mentor",
    icon: <SiFrontendmentor size={"20px"} />,
    placeholder: "https://www.frontendmentor.io/profile/",
    regex: "https://www.frontendmentor.io/profile/:username",
  },
  {
    id: 4,
    name: "Codewars",
    icon: <SiCodewars size={"20px"} />,
    placeholder: "https://www.codewars.com/users/",
    regex: "https://www.codewars.com/users/:username",
  },
  {
    id: 5,
    name: "Gitlab",
    icon: <SiGitlab size={"20px"} />,
    placeholder: "https://gitlab.com/",
    regex: "https://gitlab.com/:username",
  },
  {
    id: 6,
    name: "Hashnode",
    icon: <SiHashnode size={"20px"} />,
    placeholder: "https://hashnode.com/@",
    regex: "https://hashnode.com/@:username",
  },
  {
    id: 7,
    name: "Twitter",
    icon: <IoLogoTwitter size={"20px"} />,
    placeholder: "https://twitter.com/",
    regex: "https://twitter.com/:username",
  },
  {
    id: 8,
    name: "LinkedIn",
    icon: <FaLinkedin size={"20px"} />,
    placeholder: "https://www.linkedin.com/in/",
    regex: "https://www.linkedin.com/in/:username",
  },
  {
    id: 9,
    name: "YouTube",
    icon: <FaYoutube size={"20px"} />,
    placeholder: "https://www.youtube.com/@",
    regex: "https://www.youtube.com/@:username",
  },
  {
    id: 10,
    name: "Facebook",
    icon: <FaFacebook size={"20px"} />,
    placeholder: "https://www.facebook.com/",
    regex: "https://www.facebook.com/:username",
  },
  {
    id: 11,
    name: "Twitch",
    icon: <FaTwitch size={"20px"} />,
    placeholder: "https://www.twitch.tv/",
    regex: "https://www.twitch.tv/:username",
  },
  {
    id: 12,
    name: "Codepen",
    icon: <FaCodepen size={"20px"} />,
    placeholder: "https://codepen.io/",
    regex: "https://codepen.io/:username",
  },
  {
    id: 13,
    name: "freeCodeCamp",
    icon: <FaFreeCodeCamp size={"20px"} />,
    placeholder: "https://www.freecodecamp.org/news/author",
    regex: "https://www.freecodecamp.org/news/author/:username",
  },
  {
    id: 14,
    name: "StackOverflow",
    icon: <FaStackOverflow size={"20px"} />,
    placeholder: "https://stackoverflow.com/users/",
    regex: "https://stackoverflow.com/users/:username",
  },
];

export const platformColours = [
  {
    name: "Github",
    primaryColor: "#0A0A0A",
  },
  {
    name: "Dev.to",
    primaryColor: "#24292e",
  },
  {
    name: "Frontend Mentor",
    primaryColor: "#3f3cbb",
  },
  {
    name: "Codewars",
    primaryColor: "#8A1A50",
  },
  {
    name: "Gitlab",
    primaryColor: "#EB4925",
  },
  {
    name: "Hashnode",
    primaryColor: "#0330D1",
  },
  {
    name: "Twitter",
    primaryColor: "#1DA1F2",
  },
  {
    name: "LinkedIn",
    primaryColor: "#0077B5",
  },
  {
    name: "YouTube",
    primaryColor: "#FF0000",
  },
  {
    name: "Facebook",
    primaryColor: "#2442AC",
  },
  {
    name: "Twitch",
    primaryColor: "#EE3FC8",
  },
  {
    name: "Codepen",
    primaryColor: "#000000",
  },
  {
    name: "freeCodeCamp",
    primaryColor: "#302267",
  },
  {
    name: "StackOverflow",
    primaryColor: "#F48024",
  },
];
