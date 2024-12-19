import PostInfo from "../components/PostDetail/PostInfo";
import leftIcon from "../assets/icons/double-left_blue.svg";
import rightIcon from "../assets/icons/double-right_blue.svg";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useAuth } from "../stores/authStore";
import CommentSec from "../components/PostDetail/CommentSec";
import { useNavigate, useParams } from "react-router";
import { useLoadingStore } from "../stores/loadingStore";
import Loading from "../components/Loading";

// 아직 comments 타입을 정확히 지정하지않았다.
interface PostInfo {
  fullName: string;
  userID: string;
  createdAt: string;
  title: string;
  image: string;
  desc: string;
  likes: LikeType[];
  channelId: string;
  postID: string;
  userImg: string;
  posts: string[];
  channelName: string;
}

export default function MyPostDetail() {
  // 로딩
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const { post_id } = useParams();
  const loginId = useAuth((state) => state.user);
  const [data, setData] = useState<PostInfo | null>(null);
  const [prevPost, setPrevPost] = useState<string | null>(null);
  const [nextPost, setNextPost] = useState<string | null>(null);
  const navigate = useNavigate();
  // 편집모드
  const [edit, setEdit] = useState(false);

  const getPostData = async () => {
    try {
      startLoading();
      // 여기에 포스트 id 값 넣기
      const { data } = await api.get(`/posts/${post_id}`);
      console.log(data.author.posts);

      const {
        author: { fullName, _id: userID, image: userImg, posts },
        channel: { _id: channelId, name: channelName },
        // comments,
        title,
        createdAt,
        image,
        likes,
        _id: postID,
      } = data;

      // title이 JSON 형식이 아닐 경우를 처리
      let HTitle = "";
      let desc = "";

      if (title && title.startsWith("{") && title.endsWith("}")) {
        try {
          const parsedTitle = JSON.parse(title);

          HTitle = parsedTitle.HTitle || "";
          desc = parsedTitle.desc || "";
        } catch (error) {
          console.error("title JSON 파싱 중 오류 발생:", error);
        }
      } else {
        // JSON 형식이 아니면 그대로 title 사용
        HTitle = title;
        // desc는 비워두거나 기본값 설정
        desc = "";
      }

      setData({
        fullName,
        userID,
        // comments,
        title: HTitle,
        desc,
        createdAt,
        image,
        likes,
        channelId,
        postID,
        userImg,
        posts: posts || [],
        channelName,
      });

      getPrePostData(posts, postID);
    } catch (error) {
      console.error("Error fetching post data: ", error);
    } finally {
      stopLoading();
    }
  };

  const getPrePostData = (posts: string[], currentPostID: string) => {
    const currentIndex = posts.findIndex((post) => post === currentPostID);
    console.log(currentIndex);

    if (currentIndex === -1) {
      console.error("Post not found in the posts array");
      return;
    }

    const nextPostID = currentIndex > 0 ? posts[currentIndex - 1] : null;
    const prevPostID =
      currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
    console.log(`이전 페이지 ID : ${prevPostID}`);
    console.log(`다음 페이지 ID : ${nextPostID}`);
    setPrevPost(prevPostID);
    setNextPost(nextPostID);
  };

  const resetState = () => {
    setData(null);
    setPrevPost(null);
    setNextPost(null);
  };

  useEffect(() => {
    resetState();
    getPostData();
  }, [post_id]);

  if (!data)
    return (
      <div className="relative flex flex-col">
        <Loading />
      </div>
    );

  return (
    <div className="flex justify-center w-full h-full min-h-min dark:bg-lightBlackDark">
      <div className="w-[766px] py-12 h-fit dark:bg-lightBlackDark">
        {/* 포스트 정보  */}
        <PostInfo
          title={data.title}
          desc={data.desc}
          createdAt={data.createdAt}
          image={data.image}
          fullName={data.fullName}
          owner={data.userID === loginId?._id}
          channelId={data.channelId}
          postID={data.postID}
          edit={edit}
          setEdit={setEdit}
          userImg={data.userImg}
        />
        {/* 편집모드 일때는 댓글 렌더링 X */}
        {!edit && (
          <>
            <div className="flex justify-between">
              {/* 이전 페이지 버튼 */}
              <div
                className={`w-[150px] h-[45px] hover:bg-[#265CAC]/5 border-[0.5px] flex items-center justify-center gap-4 rounded-[10px] dark:text-white dark:border-semiDarkGreyDark ${
                  prevPost
                    ? "cursor-pointer dark:hover:bg-darkGreyDark"
                    : "cursor-not-allowed opacity-50 hover:bg-inherit"
                }`}
                onClick={() => prevPost && navigate(`/myposting/${prevPost}`)}
              >
                <img src={leftIcon} alt="leftIcon" className="w-[16px]" />
                <span>이전 포스트</span>
              </div>

              {/* 다음 페이지 버튼 */}
              <div
                className={`w-[150px] h-[45px] hover:bg-[#265CAC]/5 border-[0.5px] flex items-center gap-4 justify-center rounded-[10px] ${
                  nextPost
                    ? "cursor-pointer dark:hover:bg-darkGreyDark"
                    : "cursor-not-allowed opacity-50 hover:bg-inherit"
                } dark:text-white dark:border-semiDarkGreyDark`}
                onClick={() => nextPost && navigate(`/myposting/${nextPost}`)}
              >
                <span>다음 포스트</span>
                <img src={rightIcon} alt="leftIcon" className="w-[16px]" />
              </div>
            </div>
            {/* 댓글 섹션 */}
            <CommentSec
              likes={data.likes}
              // comments={data.comments}
              //포스트 아이디
              postId={post_id}
              postAuthorId={data.userID}
            />
          </>
        )}
      </div>
    </div>
  );
}
