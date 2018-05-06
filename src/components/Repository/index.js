import React, {Component} from 'react'
import './style.scss'

class Repository extends Component {
	render() {
		const repo = this.props.repository;

		return (
			<div className='card'>
				<div className='card-header d-flex'>
					<a href={repo.html_url} className='repo-url'>
						<h5>{repo.name}</h5>
					</a>

					<h5 className='ml-auto repo-stars'><i className='fa fa-star'></i> {repo.stargazers_count} </h5>
				</div>

				<div className='card-body'>
					<h6 className='text-muted'>{repo.description} </h6>
				</div>

				<div className='card-header text-right'>
					<span className='text-muted'>Tag: {typeof repo.language === "string" ? repo.language : "N/A"}</span>
				</div>
			</div>
		)
	}
}


export default Repository;