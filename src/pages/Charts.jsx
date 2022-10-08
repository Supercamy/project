import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import { updateDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'

function Charts() {
  const auth = getAuth()

  const [changeDetails, setChangeDetails] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update fb display name
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        // update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
        })
        toast.success('Profile updated')
      }
    } catch (error) {
      toast.error('Could not update profile')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-semibold tracking-tight text-gray-800'>
            Update Team Details
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={onSubmit}>
          <input
            id='name'
            value={name}
            name='name'
            type='text'
            onChange={onChange}
            autoComplete='name'
            required
            className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
          />
          <input
            id='email'
            value={email}
            name='email'
            type='text'
            onChange={onChange}
            autoComplete='email'
            required
            className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
          />
          <button
            onClick={onSubmit}
            type='button'
            data-mdb-ripple='true'
            data-mdb-ripple-color='light'
            className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
          >
            Click me
          </button>
        </form>
      </div>
    </div>
  )
}

export default Charts
