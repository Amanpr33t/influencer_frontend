import { Link } from "react-router-dom"
import { Fragment, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { SortActions } from "../store/slices/sortSlice";
import { SearchActions } from "../store/slices/searchSlice";
import useStateReset from "../hooks/useReset";
import { FaSearch } from "react-icons/fa";

function Navbar() {
    const { stateReset } = useStateReset()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isForm = useSelector(state => state.Form.isForm)
    const isSearch = useSelector(state => state.Search.searchData)
    const [searchData, setSearchData] = useState('')

    useEffect(() => {
        if (!isSearch) {
            setSearchData('')
        }
    }, [isSearch])

    const searchHandler = () => {
        if(!searchData){
            return
        }
        dispatch(SortActions.setSort(null))
        dispatch(SearchActions.setSearch(searchData))
    }

    const homeClick = () => {
        setSearchData('')
        stateReset()
        navigate('/', { replace: true })
    }

    return (
        <Fragment>
            <div className="fixed z-50 top-0 w-full">
                <nav className=" flex flex-row justify-between items-center bg-green-100 h-16 w-full " >
                    <div>
                        <Link href='/' className='font-semibold text-4xl pl-2 pr-2 ' onClick={homeClick}>Influencers</Link>
                    </div>
                    {!isForm &&
                        <form onSubmit={e=>{
                            e.preventDefault()
                            searchHandler()
                            }}  className="relative flex flex-row">
                            <input className="relative h-9 h-10 w-36 sm:w-60 mr-1 pl-1 pr-8 sm:pr-1 border-2 border-gray-300" type="text" placeholder="Search.." autoComplete="off" value={searchData} onChange={(e) => setSearchData(e.target.value.trim())} />
                            <FaSearch className="absolute right-2 fill-gray-600 text-2xl mr-0.5 mt-1.5  inline sm:hidden cursor-pointer" onClick={searchHandler} />
                            <button className="rounded-lg bg-blue-400 p-1 mr-1 text-base font-medium text-white hidden sm:inline" >Search</button>
                        </form>}
                </nav>
                {!isForm && <div className="flex flex-row w-full gap-3 pb-2 pt-2 ml-2 bg-white lg:bg-transparent">
                    {!isSearch && <button className="rounded-lg bg-green-500 p-1 text-base font-medium text-white" onClick={() => navigate('/form', { replace: true })}>Add Influencer</button>}
                    {isSearch && <button className="rounded-lg bg-green-700 p-1 text-base font-medium text-white" onClick={homeClick}>Home</button>}
                    {!isSearch && <select className="rounded-lg border-2 border-gray-600  cursor-pointer font-medium h-8 pl-1  " name="sort" id="sort" defaultValue="Sort By" onClick={e => e.stopPropagation()} onChange={(e) => {
                        if (e.target.value === 'followers') {
                            dispatch(SortActions.setSort('https://influencer-backend-3ncd.onrender.com/influencer/sort?sortByName=false&sortByFollowers=true'))
                        } else {
                            dispatch(SortActions.setSort('https://influencer-backend-3ncd.onrender.com/influencer/sort?sortByName=true&sortByFollowers=false'))
                        }
                    }}>
                        <option disabled >Sort By</option>
                        <option value='followers'>Followers</option>
                        <option value='name'>Name</option>
                    </select>}
                </div>}

            </div>
        </Fragment>
    )
}
export default Navbar