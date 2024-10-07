import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
 
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
        const data = await response.json();
        setTopSellers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchTopSellers();
  }, []);

  
  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <section id="section-popular" className="pb-5" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 data-aos="zoom-in">Top Sellers</h2>
            <div className="small-border bg-color-2" data-aos="fade-right"></div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {topSellers.map((item, index) => (
                <li key={index} data-aos="flip-left" data-aos-delay={`${index * 100}`}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage || AuthorImage}
                        alt=""
                        data-aos="zoom-in"
                      />
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${item.authorId}`} data-aos="fade-up">
                      {item.authorName}
                    </Link>
                    <span data-aos="fade-left">{item.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;