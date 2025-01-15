import { twMerge } from "tailwind-merge";
import Lottie from "react-lottie-player";
import lottieJson from "../../../../assets/lottie/loading-b.json";
export default function UserListLoading() {
  return (
    <div
      className={twMerge(
        "absolute z-20 flex justify-center items-center w-full h-full bg-white/80 dark:bg-lightBlackDark/50"
      )}
    >
      <Lottie
        className="w-[130px] h-[130px]"
        loop
        animationData={lottieJson}
        play
      />
    </div>
  );
}
