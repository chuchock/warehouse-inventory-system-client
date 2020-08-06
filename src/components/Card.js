import React from 'react';

import './styles/card.css';

const Card = ({name, count, image}) => (
	<div className="card mb-4" >
		<div className="row no-gutters">
			<div className="col-md-4 card-image">
				<img src={image} className="card-img" alt="" />
			</div>
			<div className="col-md-8">
				<div className="card-body">
					<h5 className="card-title">{name}</h5>
					<p className="card-text">{count}</p>
					{/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
				</div>
			</div>
		</div>
	</div>
);

export default Card;

