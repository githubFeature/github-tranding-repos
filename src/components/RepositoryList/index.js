import React from 'react'
import Repository from '../Repository'
import './style.scss'

export default function RepositoryList(props) {

	if (props.repositories !== 'empty') {

		var repos = [];

		for (var i = 0; i < props.repositories.length; i++) {
			console.log('Received Repository: ', props.repositories[i].id);

	   	repos.push(
	   		<li key = {props.repositories[i].id} className='article_item'>
	   			<Repository repository = {props.repositories[i]} />
	   		</li>
	   	);
		}

		return (
			<ul>{repos}</ul>
		);
	}


	return (
		<h2> No Matches Were Found </h2>
	);
}

