import React from 'react'
import { Link } from 'react-router-dom'
function PageNotFound() {
    return (
        <div className="h-100 row align-items-center">
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    <div className="col-md-12 col-sm-12">
        <div className="card shadow-lg border-0 rounded-lg mt-5 mx-auto" style={{width:'30rem'}}>
            <h3 className="card-header display-1 text-muted text-center" style={{'background-color': '#fff'}}>
                404
            </h3>

            <span className="card-subtitle mb-2 text-muted text-center" style={{'background-color': '#fff'}}>
                Page Could Not Be Found 
            </span>

            <div className="card-body mx-auto">
                <Link to="/login" type="button"
                className="btn btn-sm btn-primary text-white"> Back To Login </Link>
            </div> 
        </div>
    </div>
</div>
    )
}

export default PageNotFound
