import React, { useEffect, useState } from 'react'
import NewItem from './NewItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {


  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(apiUrl);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}- NewsMonkey`;
    updateNews();
  }, [])

  const fetchMoreData = async () => {
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page + 1}&pageSize=${props.pageSize}`;
    console.log(page);
    setPage(page + 1);
    let data = await fetch(apiUrl);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setLoading(false);
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h2 className="text-center" style={{ marginTop: '75px' }}>NewsMonkey- Top {capitalizeFirstLetter(props.category)} Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className='container'>
          <div className="row mt-3">
            {articles.map((article) => {
              return <div className="col-md-4  my-3" key={article.url}>
                <NewItem title={article.title} description={article.description ? article.description.slice(0, 90) + " ..." : ""} imageUrl={article.urlToImage}
                  newsUrl={article.url} author={article.author ? article.author : " unknown"} date={article.publishedAt} source={article.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
  }
}













// PREVIOUS CODE IN WHICH WE ARE SHOWING NEWS ON DIFFERENT PAGE AFTER CERTAIN NO OF NEWS AS PER PAGESIZE

//  FOR GOING TO THE PREVIOUS PAGE
//  handlePreviousClick=async ()=>{
//    let apiUrl=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1feb8462a1ad415f95a80dd155c0b1c8&page=${this.state.page-1}&pageSize=${props.pageSize}`;
//    this.setState({loading:true});
//    let data= await fetch(apiUrl);
//    let parsedData= await data.json();
//    console.log(parsedData);
//    this.setState({
//        articles:parsedData.articles,
//        page:this.state.page-1,
//        totalResults:parsedData.totalResults,
//        loading:false
//    })
//     console.log(this.state.page);
//  }



// FOR GOING TOT THE NEXT PAGE
//  handleNextClick=async ()=>{
//    let apiUrl=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1feb8462a1ad415f95a80dd155c0b1c8&page=${this.state.page+1}&pageSize=${props.pageSize}`;
//    this.setState({loading:true});
//    let data= await fetch(apiUrl);
//    let parsedData= await data.json();
//    console.log(parsedData);
//    this.setState({
//        articles:parsedData.articles,
//        page:this.state.page+1,
//        totalResults:parsedData.totalResults,
//        loading:false
//    })
//    console.log(this.state.page);


//  }




//     render() {

//         return (
//             <div className='container my-4'>
//             <h2 className="text-center">NewsMonkey- Top {this.capitalizeFirstLetter(props.category) } Headlines</h2>
//               <div className="row mt-3">
//                   { this.state.articles.map((article)=>{
//                   return  <div className="col-md-4  my-3" key={article.url}>
//                       <NewItem  title={article.title} description={article.description?article.description.slice(0,90)+" ...":""} imageUrl={article.urlToImage}
//                           newsUrl={article.url} author={article.author?article.author:" unknown"} date={article.publishedAt} source={article.source.name}/> 
//                     </div>
//                   }) }
//               </div>


//              {/* creating card on single coloum  adding spinner and not showing any data till data is fetched from api
//             while going from the one page to another*/}
//             { this.state.loading? <Spinner />: <div className="row mt-3">
//                   { this.state.articles.map((article)=>{
//                   return  <div className="col-md-4  my-3" key={article.url}>
//                       <NewItem  title={article.title} description={article.description?article.description.slice(0,90)+" ...":""} imageUrl={article.urlToImage}
//                           newsUrl={article.url} author={article.author?article.author:" unknown"} date={article.publishedAt} source={article.source.name}/> 
//                     </div>
//                   }) }
//               </div>}

//               {/* creating previous next button to go to different page */}

//               <div className="container d-flex justify-content-between ">
//                   <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}>&laquo; Previous</button>
//                   <button disabled={this.state.page>=Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-success" onClick={this.handleNextClick}>Next &raquo;</button>
//               </div>

//             </div>
//         )
//     }
// }

export default News
