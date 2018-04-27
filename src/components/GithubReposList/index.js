import React from 'react'
import Repository from '../Repository'
import './style.css'

export default function GithubReposList(props) {

	if (props !== null && props.repositories) {

		var repos = [];

		for (var i = 0; i < props.repositories.length; i++) {
			console.log(props.repositories[i].id);

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
		<h2> Nothing has been found </h2>
	);
}




