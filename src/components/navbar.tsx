import Link from "next/link"

const Navbar = () => {
  return (
    <header className="flex items-center px-4 md:px-12 py-2 justify-between fixed top-0 w-full z-50 shadow bg-white">
        <Link href={'/'}>
          <h1>LOGO</h1>
        </Link>
        <div className="flex items-center space-x-2.5 text-sm">
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href={'/'} className="mr-5 hover:text-gray-900 cursor-pointer">Home Page</Link>
          <Link href={"/products"} className="mr-5 hover:text-gray-900 cursor-pointer">All products</Link>
        </nav>
          <button className="button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent  hover:text-black   
            px-5 md:px-10 py-2.5 rounded font-semibold transition duration-200 ease-out 
          ">
            Login in
          </button>
          <button className="button bg-transparent border-blue-600 text-black hover:border-transparent hover:bg-blue-600 hover:bg-transparent   
            hover:text-white
            px-5 md:px-10 py-2.5 rounded font-semibold transition duration-200 ease-out 
            ">
            Sign up
          </button>
        </div>
    </header>
  )
}

export default Navbar