import React, { useEffect, useState } from 'react'

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]


const sizes = [
  {size_id: 'S', text: 'Small'},
  {size_id: 'M', text: 'Medium'},
  {size_id: 'L', text: 'Large'},
]



let initialForm = {
  size: '',
  customer: '',
  toppings: []
}

let initialToppings = {
	Pepperoni: false,
	"Green Peppers": false,
	Pineapple: false,
	Mushrooms: false,
	Ham: false,
}



export default function Form() {
const [form, setForm] = useState(initialForm);
const [toppingsState, setToppings] = useState(initialToppings)
const [success, setSuccess] = useState('');
const [failure, setFailure] = useState('');

useEffect( () => {
	// console.log(toppingsState)
}, [toppingsState])

useEffect( () => {
	console.log(form)
}, [form])

function dealWithToppings(checked, id, value) {
	setToppings({...toppingsState, [value]: checked})
}

function fixToppings(obj) {
	let selectedToppings = []
	for (let key in obj) {
		if (obj[key] === true) {
			//console.log(key)
			toppings.filter((info) => {
				let { topping_id: id, text } = info;
				//console.log(info)
				if (text === key) {
					selectedToppings.push(id)
				}
			});
		}
	}
	setForm({...form, toppings: selectedToppings})
}

const onChange = (evt) => {
  let { id, value, checked} = evt.target
   // console.log(`Target is: ${id}, Value is: ${value}`);
  // console.log(evt)
  // console.log(id, checked)
	if (id.length <= 2 ) {
		dealWithToppings(checked, id, value)
		id = 'toppings'
	}else {
		setForm({...form, [id]: value})
		// console.log(`Target is: ${id}, Value is: ${value}`);
	}
  // console.log(`Target is: ${id}, Value is: ${value}`)
}

function sizeMap() {
	return sizes.map((size) => {
		const { size_id, text } = size;
		return (
			<option value={size_id} key={size_id}>
				{text}
			</option>
		);
	});
}

function toppingsMap() {
	return toppings.map((topping) => {
		const { topping_id: id, text } = topping;
		return (
			<label key={id}>
				<input
					id={id}
					onChange={onChange}
					checked={toppingsState.text}
					name='topping'
					type='checkbox'
					value={text}
				/>
				{text}
				<br />
			</label>
		);
	});
}

function onSubmit(evt) {
	evt.preventDefault()
	fixToppings(toppingsState)
	// setForm({...form, toppings: toppingsState})
}

  return (
		<form onSubmit={onSubmit}>
			<h2>Order Your Pizza</h2>
			{success && <div className='success'>Thank you for your order!</div>}
			{failure && <div className='failure'>Something went wrong</div>}

			<div className='input-group'>
				<div>
					<label htmlFor='fullName'>Full Name</label>
					<br />
					<input
						placeholder='Type full name'
						id='customer'
						type='text'
						onChange={onChange}
					/>
				</div>
				{true && <div className='error'>Bad value</div>}
			</div>

			<div className='input-group'>
				<div>
					<label htmlFor='size'>Size</label>
					<br />
					<select id='size' onChange={onChange}>
						<option value=''>----Choose Size----</option>
						{/* Fill out the missing options */}
						{sizeMap()}
					</select>
				</div>
				{true && <div className='error'>Bad value</div>}
			</div>

			<div className='input-group'>
				{/* 👇 Maybe you could generate the checkboxes dynamically */}
				{toppingsMap()}
			</div>
			{/* 👇 Make sure the submit stays disabled until the form validates! */}
			<input type='submit' />
		</form>
	);
}
