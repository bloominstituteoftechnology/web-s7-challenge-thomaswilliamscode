import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Sprint 7 Challenge Learner Tests', () => {

  /*
  👉 TASK 1 - Unit Testing of sum function at the bottom of this module

  Test the following. You can create separate tests or a single test with multiple assertions.
  

    [1] sum() // throws an error 'pass valid numbers'
    [2] sum(2, 'seven') // throws an error 'pass valid numbers'
    [3] sum(1, 3) // returns 4
    [4] sum('1', 2) // returns 3
    [5] sum('10', '3') // returns 13
  */

 test('testing sum()', () => {
  const message = 'pass valid numbers';
		expect(() => sum()).toThrowError(message);
 });

 test('testing sum(2, seven)', () => {
		const message = 'pass valid numbers';
		expect(() => sum(2, 'seven')).toThrowError(message);
 });

 test('testing sum(1,3)', () => {
		let result = sum(1, 3);
		let expected = 4;
		expect(result).toBe(expected);
 });

 test('testing sum(1,2)', () => {
		let result = sum('1', 2);
		let expected = 3;
		expect(result).toBe(expected);
 });

 test('testing sum(10,3)', () => {
		let result = sum('10', '3');
		let expected = 13;
		expect(result).toBe(expected);
 });

 

  /*
  👉 TASK 2 - Integration Testing of HelloWorld component at the bottom of this module

  Test the <HelloWorld /> component found below...
    - using `screen.queryByText` to capture nodes
    - using `toBeInTheDocument` to assert their existence in the DOM

    [1] renders a link that reads "Home"
    [2] renders a link that reads "About"
    [3] renders a link that reads "Blog"
    [4] renders a text that reads "The Truth"
    [5] renders a text that reads "JavaScript is pretty awesome"
    [6] renders a text that includes "javaScript is pretty" (use exact = false)
  */
  // test('you can comment out this test', () => {
  //   expect(true).toBe(false)
  // })

  test('renders link that reads home', () => {
    render(<HelloWorld />)
    const home = screen.queryByText('Home')
    expect(home).toBeInTheDocument()
  })
  test('renders link that reads about', () => {
		render(<HelloWorld />);
		const about = screen.queryByText('About');
		expect(about).toBeInTheDocument();
	});
  test('renders link that reads blog', () => {
		render(<HelloWorld />);
		const blog = screen.queryByText('Blog');
		expect(blog).toBeInTheDocument();
	});
  test('renders a text that reads The Truth', () => {
		render(<HelloWorld />);
		const truth = screen.queryByText('The Truth');
		expect(truth).toBeInTheDocument();
	});
  test('renders a text that reads Javascript is pretty awesome', () => {
		render(<HelloWorld />);
		const js = screen.queryByText('JavaScript is pretty awesome');
		expect(js).toBeInTheDocument();
	});
  test('renders a text that reads javaScript is pretty', () => {
		render(<HelloWorld />);
		const js = screen.queryByText('javaScript is pretty', {exact:false});
		expect(js).toBeInTheDocument();
	});
})

function sum(a, b) {
  a = Number(a)
  b = Number(b)
  if (isNaN(a) || isNaN(b)) {
    throw new Error('pass valid numbers')
  }
  return a + b
}

function HelloWorld() {
  return (
    <div>
      <h1>Hello World Component</h1>
      <nav>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Blog</a>
      </nav>
      <main>
        <section>
          <h2>The Truth</h2>
          <p>JavaScript is pretty awesome</p>
        </section>
      </main>
    </div>
  )
}
