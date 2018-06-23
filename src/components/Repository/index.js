import React, {Component} from 'react'
import './style.scss'

class Repository extends Component {
	render() {
		const { repository } = this.props;

		return (
			<div className='card'>
				<div className='card-header d-flex'>
					<a href={repository.html_url} className='repo-url'><h5>{repository.name}</h5></a>
					<h5 className='ml-auto repo-stars'><i className='fa fa-star'></i> {repository.stargazers_count}</h5>
				</div>
				<div className='card-body'>
					<h6 className='text-muted'>{repository.description}</h6>
				</div>
				<div className='card-header text-right'>
					<span className='text-muted'>Language: {typeof repository.language === "string" ? repository.language : "N/A"}</span>
				</div>
			</div>
		)
	}
}


export default Repository;