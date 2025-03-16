import { useEffect, useState } from "react";
import { api } from "../api/axios";
import SwiperCustom from "../components/main/SwiperCustom";
import BmiCon from "../components/main/BmiCon";
import { useLoadingStore } from "../stores/loadingStore";
import Loading from "../components/common/Loading";

export default function Main() {
  // 로딩 관리
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const [posts, setPosts] = useState<PostType[]>([]);
  const [proteinPosts, setProteinPosts] = useState<PostType[]>([]);
  const [routinePosts, setRoutinePosts] = useState<PostType[]>([]);
  const [gymreviewPosts, setGymreviewPosts] = useState<PostType[]>([]);

  const channels = [
    { id: "675a2e0d0d335f0ddae3a194", setter: setPosts },
    { id: "675a2dac0d335f0ddae3a188", setter: setProteinPosts },
    { id: "675a2dc40d335f0ddae3a18c", setter: setRoutinePosts },
    { id: "675a2ddc0d335f0ddae3a190", setter: setGymreviewPosts },
  ];

  const getChannelPost = async (channelId: string) => {
    try {
      const { data } = await api.get(`/posts/channel/${channelId}`);
      return data.slice(0, 10);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllPosts = async () => {
    startLoading();
    const requests = channels.map(async (channel) => {
      const data = await getChannelPost(channel.id);
      channel.setter(data);
    });
    await Promise.all(requests);
    stopLoading();
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const category = [
    { title: "👋 오운완 인증 최신글", body: posts },
    { title: "💪 프로틴 추천 최신글", body: proteinPosts },
    { title: "✅ 식단 공유 최신글", body: routinePosts },
    { title: "🏋️‍♂️ 헬스장 후기 최신글", body: gymreviewPosts },
  ];

  return (
    <>
      <div className="flex flex-col gap-20 w-full relative dark:bg-lightBlackDark">
        <Loading />
        <BmiCon />
        <div className="flex flex-col justify-center">
          {/* 게시글 피드 */}
          <div className="2xl:max-w-[1200px] xl:max-w-[884px] w-full mx-auto px-4 md:max-w-[582px] lg:max-w-[600px]">
            {category.map((list, i) => (
              <div key={i} className="mb-8">
                <h2 className="font-jalnan text-xl font-semibold mb-5 dark:text-white">
                  {list.title}
                </h2>
                <SwiperCustom posts={list.body} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
