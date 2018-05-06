import React, {Component} from 'react'
import RepositoryList from '../RepositoryList'
import Header from '../Header'
import request from 'request'
import 'bootstrap/dist/css/bootstrap.css'
import './style.scss'

var repos = [];
var timer = null;

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
		console.log('TEMP: Getting Repositories...');

		var promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				let url = 'https://api.github.com/search/repositories?q=' + queryString + '&sort=stars'

				request(url, (error, response, body) => {
				    if (error) console.log('An Error Occured While Getting Repositories: ', error)
				    else resolve(body)
				})
			}, 300)
		})

		return promise;
	}

	handleChange(event) {
		const inputVal = event.target.value.trim();

		if (inputVal !== this.state.queryString) {
			this.setState({queryString: inputVal}, () => {
				console.log('------ QueryString has changed ------');

				clearTimeout(timer);

				timer = setTimeout(() => {
					this.setState({loading: 'true'});

					console.log('TEMP: Current Query String is: ', inputVal);
					
					this.loadRepos(inputVal).then(result => {
						const response = JSON.parse(result);
						repos = response.hasOwnProperty('items') ? response.items : repos;

						this.setState({loading: 'false'}, () => {
							console.log('OK: Finally Received Repositories.');
						})
					});
				}, 1000);
			});
		}
	}		

	componentDidMount() {
		timer = null;
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
										placeholder='Search for Github repositories' />

									<span className="form-control-feedback">
									  <i className="fa fa-search"></i>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			
				<div className='container text-center'>
					<RepositoryList repositories = {repos.length !== 0 ? repos : 'empty'} />
				</div>
			</div>
		)
	}
}

export default App;