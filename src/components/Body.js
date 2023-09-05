import { Fragment, useState, useEffect, useCallback } from "react"
import Card from "./Card"
import { useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import useStateReset from "../hooks/useReset"

function Body() {
    const { stateReset } = useStateReset()
    const navigate = useNavigate()

    const [isBlur, setIsBlur] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isDelete, setIsDelete] = useState(false)
    const [allInfluencerData, setAllInfluencerData] = useState(null)

    const sortURL = useSelector(state => state.Sort.sortURL)
    const searchData = useSelector(state => state.Search.searchData)

    const propLoadingFunction = (isLoading, isDelete) => {
        setLoading(isLoading)
        setIsDelete(isDelete)
    }
    const propBlurFunction = (boolean) => {
        setIsBlur(boolean)
    }

    const fetchInfluencers = useCallback(async () => {
        let url
        if (sortURL) {
            url = sortURL
        } else if (searchData) {
            url = `https://influencer-backend-3ncd.onrender.com/influencer/search_influencer?search=${searchData}`
        } else {
            url = 'https://influencer-backend-3ncd.onrender.com/influencer/all_influencers'
        }
        try {
            setLoading(true)
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Some error occured')
            }
            const data = await response.json()
            console.log(data)
            if (data.status === 'ok') {
                setAllInfluencerData(data.influencers)
                setIsBlur(false)
                setLoading(false)
            } else {
                throw new Error('Some error occured')
            }
        } catch (error) {
            setLoading(false)
            setIsBlur(true)
        }
    }, [sortURL, searchData])

    useEffect(() => {
        fetchInfluencers()
    }, [fetchInfluencers,isDelete])

    const homeClick = () => {
        navigate('/', { replace: true })
        stateReset()
    }

    return (
        <Fragment>
            {!loading && isBlur && <div className="fixed w-full top-36 flex justify-center z-50">
                <div className="relative bg-slate-200 p-12" onClick={e => e.stopPropagation()}>
                    <p className="text-base font-medium">Some error occured.</p>
                    <div className="w-full flex justify-center "><Link href='' className='text-base font-medium text-red-500' onClick={() => setIsBlur(false)}>Try again.</Link></div>
                </div>
            </div>}
            {loading && <div className="w-full pt-48 flex justify-center">
                <p className="text-base font-medium">Loading...</p>
            </div>}
            {!loading && allInfluencerData && <>
                {allInfluencerData.length === 0 && <>
                    {!searchData && <div className="w-full pt-48 flex justify-center">
                        <p className="text-base font-medium">No data available</p>
                    </div>}
                    {searchData && <div className="w-full pt-48 flex flex-col place-items-center">
                        <p className="text-base font-medium">No search results.</p>
                        <div className="w-full flex justify-center "><Link href='' className='text-base font-medium text-red-500' onClick={homeClick}>Reload</Link></div>
                    </div>}
                </>}
                {allInfluencerData.length > 0 && <div className={`pt-20 flex flex-row ${isBlur ? 'blur-sm' : ''}`} onClick={() => setIsBlur(false)}>
                    <div className='w-full pl-2 pr-2 pb-10 flex flex-col place-items-center '>
                        {allInfluencerData && allInfluencerData.length > 0 && allInfluencerData.map(inflencer => {
                            return <Fragment key={inflencer._id}>
                                <Card loadingSetter={propLoadingFunction} influencerId={inflencer._id} name={inflencer.name} socialMedia={inflencer.socialMedia} totalFollowers={inflencer.totalFollowers} blurFunction={propBlurFunction} />
                            </Fragment>
                        })}
                    </div>
                </div>}
            </>}


        </Fragment >
    )
}
export default Body