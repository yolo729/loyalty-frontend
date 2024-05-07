import ReCAPTCHA from 'react-google-recaptcha'

export const SignUp = () => {
	return (
		<section className="container bg-white">
			<div className="p-8 w-full my-16 pt-8 p-32">
				<h2 className="text-[#173B4C] mb-6 text-center text-3xl md:text-4xl font-bold">New Account</h2>
				<form>
					<div className="grid grid-cols-2 gap-4">

						<div>
							<label htmlFor="name" className="text-sm font-medium text-gray-600">EMAIL ADDRESS</label>
							<input type="text" id="email" name="email" className="mt-1 p-2 w-full border text-gray-800" />
						</div>
						<div>
							<label htmlFor="email" className="text-sm font-medium text-gray-600">CONFORM PASSWORD</label>
							<input type="email" id="conform" name="conform" className="mt-1 p-2 w-full border text-gray-800" />
						</div>
						<div>
							<label htmlFor="password" className="text-sm font-medium text-gray-600">PASSWORD</label>
							<input type="password" id="password" name="password" className="mt-1 p-2 w-full border text-gray-800" />
						</div> <br />
						<hr className='w-[87rem]' /> <br />
						<div className="flex">
							<label className="block text-gray-500 font-bold my-4" />
							<input type="checkbox" className="leading-loose text-pink-600" />
							<span className="py-2 text-sm p-2 text-gray-600 leading-snug">
								<h1 className="p-4">Consent to recieve markating communication</h1>
							</span>
							<label className="block text-gray-500 font-bold my-4">
								<a
									href="#"
									className="cursor-pointer tracking-tighter text-black border-b-2 border-gray-200 hover:border-gray-400"
								>
								</a>
							</label>
						</div>
						<div className='w-48'>
							<label htmlFor="Preference" className="text-sm font-medium text-gray-600">Contact Preference</label>
							<select defaultValue={1} id="Preference" name="Preference" className="mt-1 p-2 w-full border text-gray-800">
								<option value={1}>United status</option>
								<option value={2}>Poland</option>
							</select>
						</div>
						<div>
							<label htmlFor="referred" className="md:text-2xl text-sm font-medium text-gray-600 pt-5">referred Stores</label>
							<div className="grid grid-cols-2 pt-5 gap-4">
								<div>
									<input className='p-2' type='checkbox' />
									<span className='p-2'>1407 Lexington Avenue</span>
								</div>
								<div>
									<input className='p-2' type='checkbox' />
									<span className='p-2'>2840 Broadway</span>
								</div>
								<div>
									<input className='p-2' type='checkbox' />
									<span className='p-2'>170 West 23rd Street</span>
								</div>
								<div>
									<input className='p-2' type='checkbox' />
									<span className='p-2'>77 Seventh Ave</span>
								</div>
								<div>
									<input className='p-2' type='checkbox' />
									<span className='p-2'>180 Third Ave</span>
								</div>
								<div>
									<input className='p-2' type='checkbox' />
									<span className='p-2'>84 Third Ave</span>
								</div>
								<div>
									<input className='p-2' type='checkbox' />
									<span className='p-2'>2589 Broadway</span>
								</div>
								<div>
									<input className='p-2' type='checkbox' />
									<span className='p-2'>Maywood's Market</span>
								</div>
							</div>



						</div>
						<div className='w-48'>
							<label htmlFor="birthday" className="text-sm font-medium text-gray-600">BIRTHDAY</label>
							<input type="date" id="birthday" name="birthday" className="mt-1 p-2 w-full border text-gray-800" />
						</div>
						<hr className='w-[87rem]' /> <br />
						<div>
							<label htmlFor="firstname" className="text-sm font-medium text-gray-600">FIRST NAME</label>
							<input type="text" id="firstname" name="firstname" className="mt-1 p-2 w-full border text-gray-800" />
						</div>
						<div>
							<label htmlFor="lastname" className="text-sm font-medium text-gray-600">LAST NAME</label>
							<input type="text" id="lastname" name="lastname" className="mt-1 p-2 w-full border text-gray-800" />
						</div>
						<div>
							<label htmlFor="phone" className="text-sm font-medium text-gray-600">PHONE NUMBER</label>
							<input type="number" id="phone" name="phone" className="mt-1 p-2 w-full border text-gray-800" />
						</div>
						<div> 
							<label htmlFor="COUNTRY" className="text-sm font-medium text-gray-600">COUNTRY</label>
							<select defaultValue={1} id="COUNTRY" name="COUNTRY" className="mt-1 p-2 w-full border text-gray-800">
								<option value={1}>United status</option>
								<option value={2}>Poland</option>
							</select>
						</div>
						<div>
							<label htmlFor="password" className="text-sm font-medium text-gray-600">ZIP/POSTCODE</label>
							<input type="password" id="postcode" name="postcode" className="mt-1 p-2 w-full border text-gray-800" />
						</div>
						<div>
							<label htmlFor="password" className="text-sm font-medium text-gray-600">SUBURB/CITY</label>
							<input type="password" id="city" name="city" className="mt-1 p-2 w-full border text-gray-800" />
						</div>
						<div>
							<label htmlFor="state" className="text-sm font-medium text-gray-600">STATE/PROVINCE</label>
							<select defaultValue={1} id="state" name="state" className="mt-1 p-2 w-full border text-gray-800">
								<option value={1}>New York</option>
								<option value={2}>Miami</option>
								<option value={3}>California</option>
								<option value={4}>Florida</option>
							</select>
						</div>
						<div>
							<label htmlFor="address1" className="text-sm font-medium text-gray-600">ADDRESS LINE 1</label>
							<input type="text" id="address1" name="address1" className="mt-1 p-2 w-full border text-gray-800" />
						</div>
						<div>
							<label htmlFor="address2" className="text-sm font-medium text-gray-600">ADDRESS LINE 2</label>
							<input type="text" id="address2" name="address2" className="mt-1 p-2 w-full border text-gray-800" />
						</div>
						<div>
							<label htmlFor="address3" className="text-sm font-medium text-gray-600">COMPANY NAME</label>
							<input type="text" id="address3" name="address3" className="mt-1 p-2 w-full border text-gray-800" />
						</div>
						<br />
					</div>
					<ReCAPTCHA className='mt-5' sitekey='238valefhq923jks4jdkdzdgna93' />
					<div className="text-center">
						<button type="submit" className="p-3 text-white bg-[#173B4C] w-[10rem]">Create Account</button>
					</div>
				</form>
			</div >
		</section >
	);
};
