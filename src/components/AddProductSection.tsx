import React from 'react'
import Button from './common/Button'
import Link from 'next/link'
import { BsFillRocketTakeoffFill } from 'react-icons/bs'

const AddProductSection = () => {
    return (
        <div
            className="flex flex-col justify-center items-start space-x-8 w-1/2 m-10 rounded-lg"
            style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)" }}
        >
            <div className="row py-4 w-full flex items-center justify-start px-10 text-xxl">
                <BsFillRocketTakeoffFill /> <span className="ml-4">Get started with your first product listing. </span>
            </div>
            <div className="border-t-2 w-11/12 pt-2 text-xl">
            Easy to list a product system steps through all the requirements for creating your 1st listing.
                <div className="row py-4 w-full flex items-start justify-start">
                   <Link href="/product/add"> <Button> Add Product </Button></Link>
                </div>
            </div>
        </div>
    );
}

export default AddProductSection