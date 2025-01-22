import Link from "next/link";
import NavLink from "./NavLinks";
import { EyeIcon, LinkNavIcon, LogoIcon, ProfileNavIcon } from "./ui/Icons";
import { verifyUser } from "../_lib/dal";

const Nav: React.FC = async () => {
  const email = (await verifyUser()).email as string;
  const encrypt = btoa(email);

  return (
    <>
      <nav className="bg-white p-3 rounded-lg">
        <ul className="flex justify-between items-center">
          <li>
            <Link href={"/"}>
              <div className="flex gap-2 items-center">
                <LogoIcon />
                <p className="hidden sm:block text-2xl font-bold text-gray">
                  devlinks
                </p>
              </div>
            </Link>
          </li>
          <li>
            <div className="flex gap-5">
              <ul className="flex gap-5">
                <NavLink text="links" icon={<LinkNavIcon />} link="/" />
                <NavLink
                  link="/profile"
                  icon={<ProfileNavIcon />}
                  text="profile details"
                />
              </ul>
            </div>
          </li>

          <li>
            <Link href={`/preview/${encrypt}`}>
              <button className="capitalize px-5 py-2 border  border-ogColor hover:bg-lightPurple rounded-md">
                <span className="block sm:hidden">
                  <EyeIcon />
                </span>
                <span className="font-bold text-ogColor text-base hidden sm:block">
                  preview
                </span>
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
