import logo from './logo.svg';
import './App.css';
import { Tree } from './components/tree'
import React, { useState, useEffect, useRef } from 'react';
import tree from './tree.json'
import { MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon } from "@heroicons/react/24/outline";

function App() {

  const treeRef = useRef(null)
  const navRef = useRef(null)
  const firstNode = useRef(null)

  const [navbarHeight, setNavbarHeight] = useState(0)
  const [treeHeight, setTreeHeight] = useState(0)
  const [sliderValue, setSliderValue] = useState(1);
  const [selectPerson, setSelectPerson] = useState('')

  const assignId = (node)=>{
    if(node.children.length == 0){
      
    }
  }

  useEffect(() => {
    if (treeRef.current && navbarHeight) {
      const firstChild = treeRef.current.firstChild.firstChild.firstChild
      console.log(firstChild.offsetLeft - firstChild.getBoundingClientRect().width/2, 0)
      treeRef.current.scrollTo(firstChild.offsetLeft - window.innerWidth / 2 + firstChild.getBoundingClientRect().width / 2, 0)
    }
  }, [navbarHeight]);

  useEffect(() => {
    setTreeHeight(window.innerHeight - navRef.current.getBoundingClientRect().height)
    setNavbarHeight(navRef.current.getBoundingClientRect().height)
    
  }, [])


  const zoomChange = (event) => {
    console.log(event.target.value / 100)
    // Update the state with the new slider value
    setSliderValue(event.target.value / 100);
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
    let startX = event.clientX;
    let startY = event.clientY;

    const handleMouseMove = (event) => {
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      treeRef.current.scrollLeft -= deltaX;
      treeRef.current.scrollTop -= deltaY;
      startX = event.clientX;
      startY = event.clientY;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const findPerson = (event)=>{
    setSelectPerson(event.target.value);
  }

  return (
    <div className='h-screen'>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 border" ref={navRef}>
        <div className="max-w-screen-xl grid grid-cols-2 md:grid-cols-3 items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center w-full">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Chaudhary
              Family</span>
          </a>
          {/* <form className='order-3 col-span-2 md:col-span-1 md:order-none'>
            <label htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative my-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input type="search" id="tree-search"
                className="w-full block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search People" onChange={findPerson} required />
              <button type="submit"
                className="absolute top-0 right-0 p-2 text-sm font-medium text-white bg-blue-700 rounded-r-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </form> */}
          <div></div>
          <div className='flex justify-end md:hidden'>
            <button data-collapse-toggle="navbar-default" type="button"
              className="inline-flex justify-end items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            {/* <ul
              className="font-medium flex flex-col justify-end p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page">Home</a>
              </li>
              <li>
                <a href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>


      <div className="flex flex-col flex-1" style={{ height: treeHeight }}>
        <div className="border absolute w-11/12 mt-4 p-1 px-3 rounded-full flex items-center self-center justify-between bg-gray-100 z-10">
          {/* <label for="default-range" class="block text-sm mx-2 text-center font-medium text-gray-900 dark:text-white">zoom</label> */}
          <MagnifyingGlassMinusIcon className="h-8 w-8 text-gray-500 me-1" />

          <input id="default-range" type="range" min={window.innerWidth < 768? 20: 40} max="100" value={sliderValue * 100} className='w-full h-2 mx-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
            onChange={zoomChange} />

          <MagnifyingGlassPlusIcon className="h-8 w-8 text-gray-500 ms-1" />

        </div>
        <div id="tree" className="flex flex-row flex-1 overflow-y-scroll overflow-x-scroll relative" ref={treeRef}>
          <div style={{ transform: `scale(${sliderValue})` }} onMouseDown={handleMouseDown}>
            {
              navbarHeight == 0 ? null : <Tree node={tree} navHeight={navbarHeight} selectPerson={selectPerson}></Tree>}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
