import { useNavigate } from "react-router";
import defaultUserImg from "../../assets/defaultUser.svg";
import FollowButton from "../FollowButton";
import { useAuth } from "../../stores/authStore";
import { useEffect, useState } from "react";

interface UserBoxPropsType {
  isOnline?: boolean;
  fullname: string;
  followers: string[];
  following: string[];
  image?: string | null;
  userid: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserBox({
  fullname,
  followers,
  following,
  isOnline,
  image,
  userid,
  setIsOpen,
}: UserBoxPropsType) {
  const myfollowing = useAuth((state) => state.user?.following);
  const [userFollowers, setUserFollowers] = useState(followers.length);
  const [followingList, setFollowingList] = useState(myfollowing); //팔로우 리스트

  const navigate = useNavigate();

  const handleClick = (userId: string) => {
    setIsOpen(false);
    navigate(`/user/${userId}`);
  };

  //로그인 여부
  const isLogin = useAuth((state) => state.isLoggedIn);
  return (
    <div className="w-[320px] h-[75px] bg-[#f5f5f5] flex items-center gap-3 px-[20px] rounded-[10px] flex-shrink-0">
      {/* 유저 프로필, 현활 */}
      <div
        className="bg-white w-[48px] h-[48px] flex justify-center items-center rounded-[50%] shadow-inner cursor-pointer relative"
        onClick={() => handleClick(userid)}
      >
        <img
          src={image ? image : defaultUserImg}
          alt="사용자 프로필 사진"
          className="w-full h-full rounded-[50%]"
        />
        {isOnline && (
          <div className="w-3 h-3 rounded-[50%] bg-[#1CE777] absolute bottom-0 right-0"></div>
        )}
      </div>

      {/* 유저  info*/}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <p className="font-bold text-[15px]">{fullname}</p>
          {isLogin && (
            <FollowButton
              width="w-[80px]"
              height="h-[30px]"
              rounded="rounded-[10px]"
              userid={userid}
              followingList={followingList}
              setFollowingList={setFollowingList}
              setUserFollowers={setUserFollowers}
            />
          )}
        </div>
        <div className="text-[14px] flex gap-3 mt-[2px]">
          <p>팔로워: {userFollowers}</p>
          <p>팔로잉: {following.length}</p>
        </div>
      </div>
    </div>
  );
}
