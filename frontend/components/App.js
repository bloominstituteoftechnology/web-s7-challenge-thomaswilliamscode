import React, {useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home'
import Form from './Form'

function App() {
  return (
		<div id='app'>
			<nav>
				{/* NavLinks here */}
				<Link to={'/'}>Home</Link>
				<Link to={'order'}>Order</Link>
			</nav>
			{/* Route and Routes here */}
			<Routes>
				<Route path={'/'} element={<Home />} />
				<Route path={'/order'} element={<Form />} />
			</Routes>
			<Home />
			<Form />
		</div>
	);
}

export default App
