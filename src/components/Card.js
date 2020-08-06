import React from 'react';
import { Link } from 'react-router-dom';

import './styles/card.css';

const Card = ({ name, count, url, image }) => (

	<div className="card mb-4" >
		<Link to={url}>
			<div className="row no-gutters">
				<div className="col-md-4 card-image">
					<img src={image} className="card-img" alt="" />
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">{name}</h5>
						<p className="card-text">{count}</p>
					</div>
				</div>
			</div>
		</Link>
	</div>

);

export default Card;

