import React from 'react'
import Repository from '../Repository'
import './style.scss'

export default function RepositoryList(props) {
	if (props.repositories !== null) {
		var repos = [];

		props.repositories.map((repository) => repos.push(
				<li key={repository.id} className='article_item'>
	   			<Repository repository={repository} />
	   		</li>
		))
		return (
			<ul>{repos}</ul>
		);
	}
	else if (props.repositories === null) {
		return (<h2>No matches were found</h2>);
	}
	return (
		<h2></h2>
	);
}

