import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
const formSchema = yup.object({
	fullName: yup
		.string()
		.trim()
		.min(3, validationErrors.fullNameTooShort )
		.max(20, validationErrors.fullNameTooLong)
		.required(),
	size: yup
		.string()
		.oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect)
		.required()


})

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: "1", text: 'Pepperoni' },
  { topping_id: "2", text: 'Green Peppers' },
  { topping_id: "3", text: 'Pineapple' },
  { topping_id: "4", text: 'Mushrooms' },
  { topping_id: "5", text: 'Ham' },
]


const sizes = [
  {size_id: 'S', text: 'Small'},
  {size_id: 'M', text: 'Medium'},
  {size_id: 'L', text: 'Large'},
]



let initialForm = {
  size: '',
  fullName: '',
  toppings: [],
}
let initialErrors = {
	size: '',
	fullName: ''
}

let initialToppings = {
	Pepperoni: false,
	"Green Peppers": false,
	Pineapple: false,
	Mushrooms: false,
	Ham: false,
}

const endpoint = 'http://localhost:9009/api/order';



export default function Form() {
const [form, setForm] = useState(initialForm);
const [toppingsState, setToppings] = useState(initialToppings)
const [formDisabled, setFormDisabled] = useState(true)
const [success, setSuccess] = useState('');
const [failure, setFailure] = useState('');
const [yupError, setYupError] = useState(initialErrors)
const [yupReady, setYupReady] = useState(false)
const [submit, setSubmit] = useState(false)
const [start, setStart] = useState(false)

useEffect( () => {
	// console.log(toppingsState)
	// console.log(form)
	// console.log(' ')
}, [form.toppings])

// useEffect(() => {
// 	if (!formDisabled) {
// 		setYupReady(true);
// 	} else {
// 		setYupReady(false);
// 	}
// }, [formDisabled])

useEffect( () => {
	console.log(form.size)
}, [form.size])

useEffect( () => {
	// console.log(form)
	formSchema
		.isValid(form)
		.then((res) => {
			setFormDisabled(!res) 
		})
		.catch((err) => {
			console.log(err)
			setYupReady(false);
		});
}, [form])

useEffect( () => {
	if(submit){
		postRequest();
	}
	
}, [form.toppings])

// function theEnd(){
// 	if (submit) {
// 		setForm(initialForm);
// 		setSubmit(false);
// 	}
// }

// useEffect( () => {
// 	if (submit) {
// 		setSubmit(false)
// 		setForm(initialForm)
		
// 	}
// }, [submit])

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
	setForm( {...form, toppings: selectedToppings})
	
}

function validate(id, value) {
	yup
		.reach(formSchema, id)
		.validate(value)
		.then(() => {
			setYupError({ ...yupError, [id]: '' });
			// setForm(initialForm)
		})
		.catch((err) => {
			setYupError({ ...yupError, [id]: err.errors[0] });
		});
}

const onChange = (evt) => {
	
  let { id, value, checked} = evt.target
  
	if (id.length <= 2 ) {
		dealWithToppings(checked, id, value)
	} else {
		setForm({ ...form, [id]: value });
		validate(id, value)
		if(id === 'size') {
			setStart(true)
		}
	}
  
  
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
					checked={toppingsState[text]}
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

function postRequest() {
	
	axios
		.post(endpoint, form)
		.then((res) => {
			console.log(form);
			console.log(res.data)
			setSuccess(res.data.message);
			setFailure('');
		})
		.catch((err) => {
			setFailure(err.response.data.message);
			setSuccess('');
		})
		.finally(() => {
			
			setForm(initialForm);
			setToppings(initialToppings);
			setSubmit(false);
			setStart(false);
		});
}

function onSubmit(evt) {
	evt.preventDefault()
	setSubmit(true)
	fixToppings(toppingsState)
}

  return (
		<form onSubmit={onSubmit}>
			<h2>Order Your Pizza</h2>
			{success && <div className='success'>{success}</div>}
			{failure && <div className='failure'>{failure}</div>}

			<div className='input-group'>
				<div>
					<label htmlFor='fullName'>Full Name</label>
					<br />
					<input
						placeholder='Type full name'
						value={form.fullName}
						id='fullName'
						type='text'
						onChange={onChange}
					/>
				</div>
				{form.fullName && <div className='error'>{yupError.fullName}</div>}
			</div>

			<div className='input-group'>
				<div>
					<label htmlFor='size'>Size</label>
					<br />
					<select id='size' value={form.size}onChange={onChange}>
						<option value=''>----Choose Size----</option>
						{/* Fill out the missing options */}
						{sizeMap()}
					</select>
				</div>
				{(!form.size && start) ? <div className='error'>{yupError.size}</div> : null}
			</div>

			<div className='input-group'>
				{/* 👇 Maybe you could generate the checkboxes dynamically */}
				{toppingsMap()}
			</div>
			{/* 👇 Make sure the submit stays disabled until the form validates! */}
			<input disabled={formDisabled} type='submit' />
		</form>
	);
}
