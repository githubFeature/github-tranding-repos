import React, {Component} from 'react'

export default function Header(props) {
	return (
		<div className='container'>
			<div className='row justify-content-center'>
				<div className='col-6'>
					<div className='text-center mt-4'>
						<h1>Top Github Repos</h1>
					</div>

					<div className='text-center mt-5 form-group has-feedback-custom'>
						<div className='input-group'>
							<input defaultValue={props.query} className='form-control' type='text' name='search_query' placeholder='Enter your search query' />

							<span class="form-control-feedback">
							    <i class="fa fa-search"></i>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}