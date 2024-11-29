import { PlatformLink } from "../lib/Functions";
import Img from "../components/Img";
import MobileLink from "../components/MobileLink";

interface Props {
  fName?: string;
  lName?: string;
  email?: string;
  imgSrc?: string;
  links?: PlatformLink[];
}
const data = [
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

export default function PhoneMockup({
  fName,
  lName,
  links,
  email,
  imgSrc,
}: Props) {
  return (
    <>
      <div className=" w-[400px] hidden lg:block p-10 bg-white rounded-md">
        <div className="relative z-10 h-[650px]">
          {" "}
          <div className="absolute left-0 top-0 w-full h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              fill="none"
              viewBox="0 0 308 632"
            >
              <path
                stroke="#737373"
                d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
              />
              <path
                fill="#fff"
                stroke="#737373"
                d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
              />
              <circle cx="153.5" cy="112" r="48" fill="#EEE" />
              <rect
                width="160"
                height="16"
                x="73.5"
                y="185"
                fill="#EEE"
                rx="8"
              />
              <rect
                width="72"
                height="8"
                x="117.5"
                y="214"
                fill="#EEE"
                rx="4"
              />
              <rect width="237" height="44" x="35" y="278" fill="#EEE" rx="8" />
              <rect width="237" height="44" x="35" y="342" fill="#EEE" rx="8" />
              <rect width="237" height="44" x="35" y="406" fill="#EEE" rx="8" />
              <rect width="237" height="44" x="35" y="470" fill="#EEE" rx="8" />
              <rect width="237" height="44" x="35" y="534" fill="#EEE" rx="8" />
            </svg>
          </div>
          <div className="relative h-full">
            <div className=" relative z-10 m-auto top-[4.1rem]  px-7">
              {imgSrc && (
                <Img
                  src={imgSrc}
                  alt={fName || ""}
                  className="h-[100px] mx-auto rounded-full w-[100px] border-4 object-cover border-ogColor"
                />
              )}
              <div className="flex flex-col gap-3 relative">
                <p
                  className={`bg-white capitalize text-lg w-full font-semibold translate-y-full ${
                    !imgSrc && "absolute top-[100px] w-full"
                  }  text-center -mt-[10px] text-gray`}
                >
                  {fName && fName} {lName && lName}
                </p>
                {email && (
                  <p
                    className={`bg-white translate-y-full ${
                      !imgSrc && "absolute top-[130px] w-full"
                    }  whitespace-nowrap text-ellipsis overflow-hidden ${
                      !lName && !fName && "mt-5"
                    }  text-center`}
                  >
                    {email}
                  </p>
                )}{" "}
              </div>
            </div>
            <div className="absolute max-w-[247px] w-full top-[44%] flex flex-col gap-5 m-auto translate-x-[35px]">
              {links && links?.length > 0
                ? links.map((e) => {
                    const find = data.find((d) => d.name === e.name);
                    return (
                      <MobileLink
                        key={e.id || Date.now()}
                        name={e.name}
                        bgColor={find?.primaryColor}
                        icon={e.icon}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
