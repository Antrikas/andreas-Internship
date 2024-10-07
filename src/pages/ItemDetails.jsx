import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";


const ItemDetails = () => {
  const { nftId } = useParams();
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNftData = async () => {
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setNftData(data);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (nftId) {
      fetchNftData();
    }
  }, [nftId]);

  if (loading) {
    return (
      <div className="container" data-aos="fade-in">
        <div className="row">
          <div className="col-md-6 text-center">
            <Skeleton width="300px" height="300px" borderRadius="10px" />
          </div>
          <div className="col-md-6">
            <Skeleton width="200px" height="40px" style={{ marginBottom: "20px" }} />
            <Skeleton width="100%" height="20px" />
            <Skeleton width="100%" height="20px" />
            <Skeleton width="100%" height="20px" />
            <div className="d-flex flex-row mt-4">
              <div className="mr40">
                <h6>Owner</h6>
                <Skeleton width="50px" height="50px" borderRadius="50%" />
                <Skeleton width="100px" height="20px" style={{ marginTop: "10px" }} />
              </div>
              <div className="ml40">
                <h6>Creator</h6>
                <Skeleton width="50px" height="50px" borderRadius="50%" />
                <Skeleton width="100px" height="20px" style={{ marginTop: "10px" }} />
              </div>
            </div>
            <div className="spacer-40"></div>
            <h6>Price</h6>
            <Skeleton width="100px" height="30px" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        
        {/* Container for item details with fade-in animation */}
        <section aria-label="section" className="mt90 sm-mt-0" data-aos="fade-in" data-aos-duration="1200">
          <div className="container">
            <div className="row">
              
              {/* Image section with zoom-in animation */}
              <div className="col-md-6 text-center" data-aos="zoom-in" data-aos-duration="1000">
                <img
                  src={nftData.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              
              <div className="col-md-6" data-aos="fade-left" data-aos-duration="1200">
                <div className="item_info">
                  <h2>{nftData.title}</h2>

                  <div className="item_info_counts" data-aos="fade-up" data-aos-delay="200">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nftData.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nftData.likes}
                    </div>
                  </div>
                  <p data-aos="fade-up" data-aos-delay="300">{nftData.description}</p>
                  
                  {/* Owner information with staggered fade-up effect */}
                  <div className="d-flex flex-row mt-4" data-aos="fade-up" data-aos-delay="400">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nftData.ownerId}`}>
                            <img className="lazy" src={nftData.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nftData.ownerId}`}>{nftData.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Creator information */}
                  <div className="de_tab tab_simple" data-aos="fade-up" data-aos-delay="500">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nftData.creatorId}`}>
                            <img className="lazy" src={nftData.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nftData.creatorId}`}>{nftData.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    
                    {/* Price section with fade-up effect */}
                    <h6>Price</h6>
                    <div className="nft-item-price" data-aos="fade-up" data-aos-delay="600">
                      <img src={EthImage} alt="" />
                      <span>{nftData.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;