import { Outlet } from "react-router";
import Header from "../components/rootlayout/header/Header";
import Sidebar from "../components/rootlayout/Sidebar/Sidebar";
import { usesidebarToggleStore } from "../stores/sideberToggleStore";
import { twMerge } from "tailwind-merge";
import scrollUp from "../assets/scrollUp.svg";
import darkScrollUp from "../assets/darkicons/darkScrollBtn.svg";
import { useState } from "react";
import { useDarkModeStore } from "../stores/darkModeStore";

export default function RootLayout() {
  const isDark = useDarkModeStore((state) => state.isDark);
  const isToggle = usesidebarToggleStore((state) => state.isToggle);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 스크롤 맨위로 올리는 함수
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={twMerge(
        "flex flex-col font-pretendard w-full min-h-screen h-screen"
      )}
    >
      {/* 헤더 사이드바 */}
      <Header logo sidebar />
      <Sidebar setIsModalOpen={setIsModalOpen} />
      {/* 메인 */}
      <div
        className={twMerge(
          "flex-1 pt-[70px] transition-[padding] dark:bg-lightBlackDark laptop:pl-0",
          isToggle ? "pl-[300px]" : "pl-20" // 사이드 바에 따라 padding 값 결정
        )}
      >
        <Outlet />
      </div>
      {/* 위로 가기 버튼 */}
      <div
        className={`fixed right-[25px] bottom-[10px] z-50 w-[40px] laptop:bottom-[80px] ${
          isModalOpen && "hidden"
        }`}
      >
        <button onClick={scrollToTop}>
          <img
            src={!isDark ? scrollUp : darkScrollUp}
            alt="위로 이동"
            className="object-fill rounded-full shadow-xl"
          />
        </button>
      </div>
    </div>
  );
}
