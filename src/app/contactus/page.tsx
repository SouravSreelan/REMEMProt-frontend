"use client"

import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { fetcher } from '@/lib/utils';
import { getCookie } from 'cookies-next';
import { url } from '@/constants';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const csrfToken = getCookie('csrftoken')
    const handleOnClick = async () => {
        const postData = {
            name: name,
            email: email,
            message: message
        }
        try {
            const response = fetcher(`${url}/contact/contact/`, csrfToken as string, postData);
            console.log(response)

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section className="bg-white">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                <p className="mb-8 lg:mb-16 font-normal text-center text-gray-500 dark:text-gray-400 sm:text-xl">Feel Free to contact us any time. We will get back to you as soon as we can!</p>
                <div className="space-y-8">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="block p-3 w-full text-sm text-black bg-gray-200 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Enter your full name" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow-sm border border-gray-300 text-black bg-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@gmail.com" required />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your message</label>
                        <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="block min-h-[20rem] p-2.5 w-full text-sm text-black bg-gray-200 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your message ..." />
                    </div>
                    <div className='flex justify-end'>
                        <Button onClick={handleOnClick}>Send message</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
