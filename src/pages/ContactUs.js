import React from 'react'
import emailjs from '@emailjs/browser'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

const ContactUs = () => {
  const navigate = useNavigate()
  function sendEmail(e) {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_wx6fs4a',
        'template_fh0culc',
        e.target,
        'user_6WfbHRDcKxbZeeScprByO'
      )
      .then(
        (result) => {
          message.success('Thanks for your message!')
        },
        (error) => {
          message.error(error.text)
        }
      )
    e.target.reset()
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }
  return (
    <div>
      <div className='container'>
        <h1 className='text-center my-3 text-uppercase'>Contact Us</h1>
        <form onSubmit={sendEmail}>
          <div className='row mx-auto'>
            <div className='col-8 form-group mx-auto'>
              <input
                type='text'
                className='form-control'
                placeholder='Name'
                name='name'
              />
            </div>
            <div className='col-8 form-group pt-2 mx-auto'>
              <input
                type='email'
                className='form-control'
                placeholder='Email Address'
                name='email'
              />
            </div>
            <div className='col-8 form-group pt-2 mx-auto'>
              <input
                type='text'
                className='form-control'
                placeholder='Subject'
                name='subject'
              />
            </div>
            <div className='col-8 form-group pt-2 mx-auto'>
              <textarea
                className='form-control'
                id=''
                cols='30'
                rows='8'
                placeholder='Your message'
                name='message'
              ></textarea>
            </div>
            <div className='col-8 pt-3 mx-auto'>
              <input
                type='submit'
                className='btn btn-info'
                value='Send Message'
              ></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
