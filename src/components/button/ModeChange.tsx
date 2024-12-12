import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { usesidebarToggleStore } from "../../stores/sideberToggleStore";
import horizontalAfternoon from "../../assets/horizontalAfternoon.svg";
import horizontalNight from "../../assets/horizontalNight.svg";
import verticalAfternoon from "../../assets/verticalAfternoon.svg";
import verticalNight from "../../assets/verticalNight.svg";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
import DeleteConfirm from "../modal/DeleteConfirm";

export default function ModeChange() {
  const [isClicked, setIsClicked] = useState(false);
  const isToggle = usesidebarToggleStore((state) => state.isToggle);

  /* 삭제 모달 테스트용 코드 */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => {
    // 모달 열기
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    // 모달 닫기
    setIsModalOpen(false);
  };

  const handleModeChange = () => {
    // 실제 모드 변경 로직
    setIsClicked((click) => !click);
    setIsModalOpen(false);
  };
  /* 테스트용 코드 여기까지 */

  // const handleClick = () => {
  //   setIsClicked((click) => !click);
  // };

  return (
    <div>
      {/* 사이드바 열렸을 때 다크모드 버튼 */}
      <button
        onClick={handleClick}
        className={twMerge(
          "relative w-[100px] h-[40px] rounded-full text-white font-bold text-[16px] overflow-hidden",
          !isToggle && "hidden"
        )}
        style={{
          backgroundImage: isClicked
            ? `url(${horizontalNight})`
            : `url(${horizontalAfternoon})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src={isClicked ? moon : sun}
          alt="circleHorizontal"
          className="absolute w-[30px] h-[30px] rounded-full transition-all duration-300 ease-in-out"
          style={{
            transform: isClicked ? "translateX(5px)" : "translateX(65px)",
            marginTop: "-15px",
            top: "50%",
          }}
        />
      </button>
      <button
        onClick={handleClick}
        className={twMerge(
          "relative w-[40px] h-[100px] rounded-full text-white font-bold text-[16px] overflow-hidden",
          isToggle && "hidden"
        )}
        style={{
          backgroundImage: isClicked
            ? `url(${verticalNight})`
            : `url(${verticalAfternoon})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src={isClicked ? moon : sun}
          alt="circleVertical"
          className="absolute w-[30px] h-[30px] rounded-full transition-all duration-300 ease-in-out"
          style={{
            transform: isClicked ? "translateY(65px)" : "translateY(5px)",
            marginTop: "0px",
            top: "0%",
            right: "12%",
          }}
        />
      </button>
      {/* DeleteConfirm 모달 */}
      {isModalOpen && (
        <DeleteConfirm
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleModeChange}
          message="이 게시글을 정말 삭제하시겠습니까?"
        />
      )}
    </div>
  );
}