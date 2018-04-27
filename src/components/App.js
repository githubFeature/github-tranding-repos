import React, {Component} from 'react'
import GithubReposList from './GithubReposList'
import Header from './GithubReposList/Header'
import request from 'request'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'

var repos = [];
const WAIT_INTERVAL = 1000;

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			queryString: '',
			loading: 'initial',
		};

		this.handleChange = this.handleChange.bind(this);
	}

	loadRepos(queryString) {
		console.log('loading repos...');

		var promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				let url = 'https://api.github.com/search/repositories?q=' + queryString + '&sort=stars';

				request(url, (error, response, body) => {
				    if (error) console.log(error);
				    else resolve(body);
				});
			}, 300);
		});

		return promise;
	}

	handleChange(event) {
		const inputVal = event.target.value;
		this.setState({queryString: inputVal});

		clearTimeout(this.timer);

		this.timer = setTimeout(() => {
			this.setState({loading: 'true'});

			console.log('current query: ', inputVal);
			
			this.loadRepos(inputVal).then(result => {
				let obj = JSON.parse(result);
				repos = obj.items;

				this.setState({
					loading: 'initial'
				}, () => {
					console.log('successfully initialized');
				})
			});

			
		}, WAIT_INTERVAL);
	}

	componentDidMount() {
		this.timer = null;
	}

	render() {		
		if (this.state.loading === 'true') {
			return (
				<div>
					<Header query = {this.state.queryString} />
			
					<div className='container text-center mt-4'>
						<h2> Loading ... </h2>
					</div>
				</div>
			);
		}

		return (
			<div>
				<div className='container'>
					<div className='row justify-content-center'>
						<div className='col-6'>
							<div className='text-center mt-4'>
								<h1>Top Github Repos</h1>
							</div>

							<div className='text-center mt-5 form-group has-feedback-custom'>
								<div className='input-group'>
									<input 
										className='form-control' 
										type='text' 
										value={this.state.queryString}
										onChange={this.handleChange}
										name='search_query' 
										placeholder='Search for github repos' />

									<span class="form-control-feedback">
									    <i class="fa fa-search"></i>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			
				<div className='container text-center'>
					<GithubReposList repositories = {repos} />
				</div>
			</div>
		)
	}
}

export default App;