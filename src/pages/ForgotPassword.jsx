import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent ')
    } catch (error) {
      toast.error('Could not send email')
    }
  }

  return (
    <div className='container mx-auto'>
      <div className='mt-32 flex justify-center px-6 my-12'>
        <div className='w-full xl:w-3/4 lg:w-11/12 flex'>
          <div className='w-full h-auto bg-white hidden lg:block lg:w-1/2 bg-cover rounded-l-lg'>
            <img
              className='rounded-t shadow-lg object-fill '
              src='https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_960_720.jpg'
            />
            {/* <img
              className='rounded-t shadow-lg object-fill  '
              src='https://preview.cruip.com/mosaic/images/pay-bg.jpg'
            /> */}
          </div>

          <div className='w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none'>
            <div className='px-8 mb-4 text-center'>
              <h3 className='pt-4 mb-2 text-2xl'>Forgot Your Password?</h3>
              <p className='mb-4 text-sm text-gray-700'>
                We get it, stuff happens. Just enter your email address below
                and we'll send you a link to reset your password!
              </p>
            </div>
            <form
              className='px-8 pt-6 pb-8 mb-4 bg-white rounded'
              onSubmit={onSubmit}
            >
              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-bold text-gray-700'
                  for='email'
                >
                  Email
                </label>
                <input
                  className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  value={email}
                  onChange={onChange}
                  placeholder='Enter Email Address...'
                />
              </div>
              <div className='mb-6 text-center'>
                <button
                  className='w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded-full hover:bg-indigo-700 focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Reset Password
                </button>
              </div>
              <hr className='mb-6 border-t' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
