import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Skeleton from "../UI/Skeleton";


const NewItems = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  const [nftObjects, setNftObjects] = useState ({})

  const [loading, setLoading] = useState (true)


  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",filter: "invert()" }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", filter: "invert()" }}
        onClick={onClick}
      />
    );
  }

  async function FetchApi () {
    setLoading(true);
    try {
      const  apiData  = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems') 
      setNftObjects(apiData.data)
      console.log (apiData)
      setLoading(false);
      }
      catch (error) {
        console.error ('Error fetching NFTs:',  error);
        setLoading(true);
      }
    }

    useEffect(() => {
     FetchApi()
    },[])

  
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>New Items</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <Slider {...settings}>
              {loading ? (
                [...Array(4)].map((_, index) => (
                  <div className="col-lg-12 col-md-12 col-sm-10 col-xs-12" key={index}>
                   

                   
                  </div>
                ))
              ) : (
                Object.values(nftObjects).map((object, index) => (
                  <div className="col-lg-12 col-md-12 col-sm-10 col-xs-12" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={object.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className={object.countdown}>5h 30m 32s</div>
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
                        <div className="nft__item_info">
                          <Link to="/item-details">
                            <img src={object.nftImage} className="lazy nft__item_preview" alt="" />
                          </Link>
                          <Link to="/item-details">
                            <h4>{object.title}</h4>
                          </Link>
                          <div className={object.price}>3.08 ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>ERC-{object.code}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </Slider>
          </div>
        </div>
      </section>
    );
  };
  
  export default NewItems;