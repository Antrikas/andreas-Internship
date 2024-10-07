import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchAuthorData = async () => {
      try {
        const response = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
        const data = await response.json();
        setAuthorData(data);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  // Toggle follow/unfollow and update followers count
  const handleFollowClick = () => {
    if (authorData) {
      setAuthorData({
        ...authorData,
        followers: isFollowing ? authorData.followers - 1 : authorData.followers + 1
      });
      setIsFollowing(!isFollowing);
    }
  };

  if (!authorData) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">{authorData.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{authorData.followers} followers</div>
                      <button onClick={handleFollowClick} className="btn-main">
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={authorData} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
