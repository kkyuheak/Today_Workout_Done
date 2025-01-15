import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";

interface ChannelListProps {
  children: string;
  icon: string;
  alt: string;
  route: string;
  toggleStyle?: string;
  isToggleOpen: boolean;
}

export default function ChannelList({
  children,
  icon,
  alt,
  route,
  toggleStyle,
  isToggleOpen,
}: ChannelListProps) {
  return (
    <NavLink id={route} to={route} className="cursor-pointer laptop:flex-1 ">
      {({ isActive }) => (
        <li
          className={twMerge(
            "w-full border-l-4 laptop:border-l-0",
            isActive
              ? "border-[#265CAC] dark:border-[#6FBEFF]"
              : "border-transparent"
          )}
        >
          <div
            className={twMerge(
              `flex items-center gap-[10px] w-full h-[45px] pl-6  text-base font-normal rounded-lg ${
                isActive
                  ? "bg-[#E8F3FC] dark:bg-[#6fbeff2c] laptop:bg-inherit"
                  : "bg-[#FEFEFE] dark:bg-[#2C2C2C] laptop:bg-inherit"
              } hover:bg-[#EAEAEA] dark:hover:bg-[#4f4f4f] hover:transition-colors cursor-pointer dark:text-[#fff] laptop:hover:bg-inherit`,
              toggleStyle // 토글 스타일 지정
            )}
          >
            <img className="w-7" src={icon} alt={alt} />
            <div className={twMerge(!isToggleOpen && "hidden")}>{children}</div>
          </div>
        </li>
      )}
    </NavLink>
  );
}
