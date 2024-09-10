import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

const ExploreItems = () => {
  const [nftObjects, setNftObjects] = useState([]);
  const [countdownTimes, setCountdownTimes] = useState({}); // Countdown state
  const [visibleItems, setVisibleItems] = useState(8);

  // Fetching NFT data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        setNftObjects(response.data); // Assuming response.data is an array of NFTs
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    fetchData();
  }, []);

  // Countdown logic
  useEffect(() => {
    const initialCountdownTimes = Object.fromEntries(
      nftObjects.map((nft) => [nft.id, nft.expiryDate])
    );
    setCountdownTimes(initialCountdownTimes);

    const interval = setInterval(() => {
      setCountdownTimes((prevCountdownTimes) => {
        const updatedCountdownTimes = { ...prevCountdownTimes };
        Object.keys(prevCountdownTimes).forEach((id) => {
          if (prevCountdownTimes[id] > 0) {
            updatedCountdownTimes[id] -= 1000;
          }
        });
        return updatedCountdownTimes;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [nftObjects]);

  const calculateRemainingTime = (countdownTime) => {
    const now = new Date().getTime();
    const distance = countdownTime - now;
    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  };

  const loadMoreItems = () => {
    setVisibleItems((prevValue) => prevValue + 4); // Increase the number of visible items by 4
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {nftObjects.slice(0, visibleItems).map((nft) => (
        <div
          key={nft.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link to={`/author/${nft.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top">
                <img className="lazy" src={nft.authorImage || AuthorImage} alt="author" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {/* Display the dynamic countdown */}
            {countdownTimes[nft.id] > 0 ? (
              <div className="de_countdown">
                {calculateRemainingTime(countdownTimes[nft.id]).hours}h{" "}
                {calculateRemainingTime(countdownTimes[nft.id]).minutes}m{" "}
                {calculateRemainingTime(countdownTimes[nft.id]).seconds}s
              </div>
            ) : (
              <div className="de_countdown">Expired</div>
            )}

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${nft.nftId}`}>
                <img src={nft.nftImage || nftImage} className="lazy nft__item_preview" alt={nft.title} />
              </Link>
            </div>

            <div className="nft__item_info">
              <Link to={`/item-details/${nft.nftId}`}>
                <h4>{nft.title}</h4>
              </Link>
              <div className="nft__item_price">{nft.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{nft.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
 {visibleItems < nftObjects.length && (
      <div className="col-md-12 text-center">
      <button onClick={loadMoreItems} className="btn-main lead">
        Load more
      </button>
      </div>
      )}
    </>
  );
};

export default ExploreItems;