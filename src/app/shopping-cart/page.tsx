"use client"

import { ProductType } from "@/interfaces";
import { StarIcon } from "@heroicons/react/24/outline";
import { get } from "http"
import ReactStars from "react-stars";
import {  StarIcon as StarIconOutline }  from "@heroicons/react/24/outline"
import CustomImage from "@/components/image";
import { json } from "stream/consumers";
import { useEffect, useState } from "react";
import Product from "@/components/product";


const ShoppingCart = () => {
  const [total,setTotal] = useState<number>(0)
  const [products,setProducts] = useState<ProductType[]>(
    JSON.parse(localStorage.getItem("carts") as string) || []
    )
  const removeProduct =(id: number) =>{
    const updateCart = products.filter(product => product.id === id);
    localStorage.setItem("carts",JSON.stringify(updateCart))
    setProducts(updateCart)
  }

  const handleIncrement = (id: number) => {
    const updateCart = products.map(product =>{
      if(product.id === id){
        return{
          ...product,
          qunatity: product.qunatity + 1
        }
      }
      return product;
    })
    localStorage.setItem('carts',JSON.stringify(updateCart))
    setProducts(updateCart)
  }

  const handleDecrement = (id: number) => {
    const isExistProduct = products.find(product => product.id === id)
    if(isExistProduct?.qunatity === 1){
        removeProduct(isExistProduct.id)
    }else{

      const updateCart = products.map(product =>{
        if(product.id === id){
          return{
            ...product,
            qunatity: product.qunatity - 1
          }
        }
        return product;
      })
      localStorage.setItem('carts',JSON.stringify(updateCart))
      setProducts(updateCart)
    }
    }

    useEffect(() =>{
      const total = products.reduce((acc,item) =>{
        return acc + item.price * item.qunatity
      },0)
      setTotal(total)
    },[products])

  
  return (
    <>
    {products.length ?(
      <div>
      <div className="h-screen bg-gray-100 pt-20">
  <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
    <div  className="rounded-lg md:w-2/3">
    {products.map(product => (
      <div key={product.id} className="justify-between mb-6 rounded-lg  bg-white p-6 shadow-md sm:flex sm:justify-start">
        <div className="relative w-52 ">
          <CustomImage product={product} />
        </div>
        <div className="sm:ml-4 sm:flex gap-x-4 sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">{product.title}</h2>
            <p className="my-4 text-xs text-gray-700 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between ml-2 mr-6">
                      <ReactStars value={product.rating.rate} edit={true}/>
                      <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                        See all {product?.rating.count}
                      </p>
           </div>
          </div>
          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100">
              <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => handleDecrement(product.id)}> - </span>
              <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={product.qunatity} min="1" />
              <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => handleIncrement(product.id)}> + </span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">{(product.price * product.qunatity).toLocaleString("en-US",{style:"currency" ,currency:"usd"})}</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
              onClick={() =>removeProduct(product.id)}
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      ))}
      </div>

    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">{total.toLocaleString("en-US",{style:"currency" ,currency:"usd"})}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-700">${(10).toLocaleString("en-US",{style:"currency" ,currency:"usd"})}</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">{(total + 10).toLocaleString("en-US",{style:"currency" ,currency:"usd"})}</p>
          <p className="text-sm text-gray-700">including VAT</p>
        </div>
      </div>
      <button className=" mt-6 w-full rounded-md bg-blue-500 py-4 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
    </div> 
  </div>
</div>
  </div>
    ) : (
      <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
              <a href="#" className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</a>
          </div>   
      </div>
  </section>
    )}
    </>
  )
}

export default ShoppingCart