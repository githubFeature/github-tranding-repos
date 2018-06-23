import React, {Component} from 'react'
import RepositoryList from '../RepositoryList'
import request from 'request'
import 'bootstrap/dist/css/bootstrap.css'
import './style.scss'

var repos = [];

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			queryString: '',
			loading: 'initial',
			repositories: []
		};
		this.queryInputHandler = this.queryInputHandler.bind(this);
		this.getRepositoriesByQueryFn = this.getRepositoriesByQueryFn.bind(this);
	}
	getRepositoriesByQueryFn(queryString) {
		var promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				request('https://api.github.com/search/repositories?q=' + queryString + '&sort=stars', (error, response, body) => {
				    if (error) console.log('An error occured while getting repositories: ', error)
				    else resolve(body)
				})
			}, 300)
		})
		return promise;
	}
	queryInputHandler(event) {
		const inputVal = event.target.value.trim();

		if (inputVal !== this.state.queryString) {
			this.setState({queryString: inputVal}, () => {
				clearTimeout(this.timer);

				this.timer = setTimeout(() => {
					this.setState({loading: 'true'});
					this.getRepositoriesByQueryFn(inputVal).then(result => {
						const response = JSON.parse(result);
						repos = response.hasOwnProperty('items') ? response.items.length !== 0 ? response.items : null : null;
						this.setState({ loading: 'false', repositories: repos }, () => console.log('OK: Finally Received Repositories.'))
					});
				}, 1000);
			});
		}
	}		
	componentDidMount() {
		this.timer = null;
	}
	render() {		
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
										onChange={this.queryInputHandler}
										name='search_query' 
										placeholder='Search for Github repositories' />

									<span className="form-control-feedback"><i className="fa fa-search"></i></span>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				{this.state.loading === 'true' && 
					<div className='container text-center mt-4'>
						<h2>Loading ...</h2>
					</div>
				}
				{this.state.loading !== 'true' &&
					<div className='container text-center'>
						<RepositoryList repositories={repos} />
					</div>
				}
			}
			</div>
		)
	}
}

export default App;
