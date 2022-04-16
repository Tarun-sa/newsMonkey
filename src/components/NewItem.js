import React from 'react'

      const NewItem=(props)=> {
          
        let {title,description,imageUrl,newsUrl,author,date,source}=props
        return (
            <div >
              <div className="card">
                <img src={imageUrl?imageUrl:"https://m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png"} className="card-img-top" alt=""/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"> <small className="text-muted">By {author} on {new Date(date).toGMTString()}</small> </p>
                    <p className="text-muted">at {source}</p>
                    <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Details</a>
                </div>
            </div> 
            </div>
        )
   
}

export default NewItem;
