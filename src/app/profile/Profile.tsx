import Layout from "@/Components/Layout";
import React from "react";

type Props = {};

const Profile = (props: Props) => {
  return (
    <>
      <Layout>
        <div className="p-5">
          {/* cover */}

          <div className="bg-blue-700 w-full h-32 relative">
            {/* <img src={} alt="" /> //cover image */}
            {/* profile */}
            <div className="flex items-center">
              <div className="flex w-24 bg-slate-200 aspect-square rounded-full absolute left-4 -bottom-12 shadow-lg">
                {/* <img
                  src={avatar === undefined ? userImage : avatar}
                  alt=""
                  className="rounded-full"
                /> */}
              </div>
              {/* {getUserDid() !== params.did && (
                <button
                  onClick={isFollowing ? unfollow : follow}
                  className={`px-5 py-1 select-none ${
                    isFollowing ? `bg-slate-700` : ` bg-blue-600`
                  } cursor-pointer absolute rounded-lg right-10 top-3 mt-[8rem] text-white`}
                >
                  {isFollowing ? "Following" : "+ Follow"}
                </button>
              )} */}
            </div>
          </div>

          {/* profile details */}
          <div className="flex flex-col gap-3 mt-[64px]">
            <div className="flex flex-col">
              <div className="text-2xl display-font ml-2">
                {/* {displayName === undefined ? handle : displayName} */}
              </div>
              <div className="flex ml-2 gap-2">
                {/* {followsYou ? (
                  <button className="bg-slate-200 text-[10px] rounded-md p-1">
                    Follows You
                  </button>
                ) : null} */}
                <div className="text-sm text-slate-500">{/* @{handle} */}</div>
              </div>
            </div>
            <div>
              {/* <div className="text-sm">Bio</div> */}
              <div className="text-sm ml-2">{/* {description} */}</div>
            </div>
          </div>
          {/* profile stats */}
          <div className="flex gap-8 pt-2 ml-2">
            <div className="flex gap-1 items-center">
              <div className="text-[15px]">
                {/* {followersCount?.toString()}  */}
              </div>
              <span className="text-slate-500 text-[13px]">followers</span>
            </div>
            <div className="flex gap-1 items-center">
              {/* <div className="text-[15px]">{followsCount?.toString()} </div> */}
              <span className="text-slate-500 text-[13px]">following</span>
            </div>
            <div className="flex gap-1 items-center">
              {/* <div className="text-[15px]">{postsCount?.toString()} </div> */}
              <span className="text-slate-500 text-[13px]">posts</span>
            </div>
          </div>

          {/* posts */}
          <div className=" rounded-md  w-full flex flex-col gap-3 mt-5">
            {/* {
              // here we will map the feed
              feedData.map((item: dataGotFromApi, index) => {
                if (index === feedData.length - 1) {
                  return (
                    <div ref={lastElementRef} key={index}>
                      <PostCard
                        author={item.author.displayName}
                        handle={item.author.handle}
                        did={item.author.did}
                        comments={item.comments}
                        likes={item.likes}
                        caption={item.caption.text}
                        image={item.image.embed.images[0].thumb}
                        profileImg={item.author.avatar}
                        uri={item.uri}
                        cid={item.cid}
                        repostCount={item.repostCount}
                        reply={item.reply}
                        reason={item.reason}
                        embed={item.embed}
                        indexedAt={item.indexedAt}
                        replyParent={item.replyParent}
                        isFromProfile={true}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                      <PostCard
                        author={item.author.displayName}
                        handle={item.author.handle}
                        did={item.author.did}
                        comments={item.comments}
                        likes={item.likes}
                        caption={item.caption.text}
                        image={item.image.embed.images[0].thumb}
                        profileImg={item.author.avatar}
                        uri={item.uri}
                        cid={item.cid}
                        repostCount={item.repostCount}
                        reply={item.reply}
                        reason={item.reason}
                        embed={item.embed}
                        indexedAt={item.indexedAt}
                        replyParent={item.replyParent}
                        isFromProfile={true}
                      />
                    </div>
                  );
                }
              })
            } */}
            {/* {isLoading && !(fetchedDataLength < 20) ? (
              <>
                {" "}
                <PostLoader /> <PostLoader />
              </>
            ) : (
              ""
            )} */}
          </div>
        </div>
        {/* ); */}
      </Layout>
    </>
  );
};

export default Profile;
