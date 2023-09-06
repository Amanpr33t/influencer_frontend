import { Link } from "react-router-dom"
import { Fragment, useState, useEffect } from "react"
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FormActions } from "../store/slices/formSlice"
import useStateReset from "../hooks/useReset"

function InfluencerForm() {
    const { stateReset } = useStateReset()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [influencerName, setInfluencerName] = useState('')

    const [instagramId, setInstagramId] = useState('')
    const [instagramFollowers, setInstagramFollowers] = useState('')
    const [youtubeId, setYoutubeId] = useState('')
    const [youtubeFollowers, setYoutubeFollowers] = useState('')
    const [twitterId, setTwitterId] = useState('')
    const [twitterFollowers, setTwitterFollowers] = useState('')
    const [facebookId, setFacebookId] = useState('')
    const [facebookFollowers, setFacebookFollowers] = useState('')

    const [nameError, setNameError] = useState(false)
    const [instagramIdError, setInstagramIdError] = useState(false)
    const [instagramFollowersError, setInstagramFollowersError] = useState(false)
    const [twitterIdError, setTwitterIdError] = useState(false)
    const [twitterFollowersError, setTwitterFollowersError] = useState(false)
    const [youtubeIdError, setYoutubeIdError] = useState(false)
    const [youtubeFollowersError, setYoutubeFollowersError] = useState(false)
    const [facebookIdError, setFacebookIdError] = useState(false)
    const [facebookFollowersError, setFacebookFollowersError] = useState(false)

    const [isBlur, setIsBlur] = useState(false)

    const editData = useSelector(state => state.Edit)

    useEffect(() => {
        dispatch(FormActions.setForm(true))
    }, [dispatch])

    const homeClick = () => {
        navigate('/', { replace: true })
        stateReset()
    }

    useEffect(() => {
        if (editData.isEdit) {
            setInfluencerName(editData.influencerName)
            editData.socialMedia.forEach(social => {
                if (social.website === 'instagram') {
                    setInstagramId(social.handle)
                    setInstagramFollowers(+social.followers)
                } else if (social.website === 'twitter') {
                    setTwitterId(social.handle)
                    setTwitterFollowers(+social.followers)
                } else if (social.website === 'youtube') {
                    setYoutubeId(social.handle)
                    setYoutubeFollowers(+social.followers)
                } else if (social.website === 'facebook') {
                    setFacebookId(social.handle)
                    setFacebookFollowers(+social.followers)
                }
            })
        }
    }, [editData.isEdit, editData.influencerName, editData.socialMedia])

    const formSubmit = async (e) => {
        e.preventDefault()
        if (!influencerName.trim()) {
            return setNameError(true)
        }
        if ((!facebookId && !facebookFollowers) && (!twitterId && !twitterFollowers) && (!youtubeId && !youtubeFollowers) && (!instagramId && !instagramFollowers)) {
            //add atleast one social media handle
            return
        }
        if ((instagramId && !instagramFollowers) || (!instagramId && instagramFollowers)) {
            if (!instagramId) {
                setInstagramIdError(true)
            } else {
                setInstagramFollowersError(true)
            }
        }
        if ((youtubeId && !youtubeFollowers) || (!youtubeId && youtubeFollowers)) {
            if (!youtubeId) {
                setYoutubeIdError(true)
            } else {
                setYoutubeFollowersError(true)
            }
        }
        if ((twitterId && !twitterFollowers) || (!twitterId && twitterFollowers)) {
            if (!twitterId) {
                setTwitterIdError(true)
            } else {
                setTwitterFollowersError(true)
            }
        }
        if ((facebookId && !facebookFollowers) || (!facebookId && facebookFollowers)) {
            if (!facebookId) {
                setFacebookIdError(true)
            } else {
                setFacebookFollowersError(true)
            }
        }
        if ((facebookId && !facebookFollowers) || (!facebookId && facebookFollowers) || (twitterId && !twitterFollowers) || (!twitterId && twitterFollowers) || (youtubeId && !youtubeFollowers) || (!youtubeId && youtubeFollowers) || (instagramId && !instagramFollowers) || (!instagramId && instagramFollowers)) {
            return
        }

        const socialMedia = []
        if (facebookId && facebookFollowers) {
            socialMedia.push({
                website: "facebook",
                handle: facebookId,
                followers: facebookFollowers
            })
        }
        if (twitterId && twitterFollowers) {
            socialMedia.push({
                website: "twitter",
                handle: twitterId,
                followers: twitterFollowers
            })
        }
        if (youtubeId && youtubeFollowers) {
            socialMedia.push({
                website: "youtube",
                handle: youtubeId,
                followers: youtubeFollowers
            })
        }
        if (instagramId && instagramFollowers) {
            socialMedia.push({
                website: "instagram",
                handle: instagramId,
                followers: instagramFollowers
            })
        }
        const influencerData = {
            name: influencerName,
            socialMedia
        }
        let url
        let method
        if (editData.isEdit) {
            url = `https://influencer-backend-37g2.onrender.com/influencer/edit/${editData.influencerId}`
            method = 'PATCH'
        } else {
            url = 'https://influencer-backend-37g2.onrender.com/influencer/add'
            method = 'POST'
        }
        try {
            setLoading(true)
            const response = await fetch(url, {
                method,
                body: JSON.stringify(influencerData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Some error occured')
            }
            const data = await response.json()
            if (data.status === 'ok') {
                setLoading(false)
                setIsBlur(false)
                stateReset()
                navigate('/', { replace: true })
            } else {
                throw new Error('Some error occured')
            }
        } catch (error) {
            setLoading(false)
            setIsBlur(true)
        }
    }


    return (
        <Fragment>
            {!loading && isBlur && <div className="fixed w-full top-36 flex justify-center z-50">
                <div className="relative bg-slate-300 p-12" onClick={e => e.stopPropagation()}>
                    <p className="text-base font-medium">Some error occured.</p>
                    <div className="w-full flex justify-center "><Link href='' className='text-base font-medium text-red-500' onClick={() => setIsBlur(false)}>Try again.</Link></div>
                </div>
            </div>}
            {loading && <div className="w-full mt-48 flex justify-center">
                <p className="text-base font-medium">Loading...</p>
            </div>}
            {!loading &&
                <div className={`h-screen pt-16 ${isBlur ? 'blur-sm' : ''}`} onClick={() => setIsBlur(false)}>
                    <div>
                        <button className="rounded-lg bg-green-700 p-1 text-base font-medium text-white mt-2 mb-2 ml-2" onClick={homeClick}>Home</button>
                    </div>

                    <div className='pl-2 pr-2 flex flex-col  place-items-center' >
                        <div className="bg-gray-200 p-2">
                            <form className="flex flex-col gap-8" onSubmit={formSubmit}>
                                <div>
                                    <label className="text-lg font-medium  pr-2 mr-24" htmlFor="title">Name</label>
                                    <input type="text" className="border-2 border-gray-400 pl-1 pr-1" id="title" name="title" placeholder="Enter name here..." autoComplete="off" value={influencerName} onChange={e => {
                                        setInfluencerName(e.target.value.trimStart())
                                        setNameError(false)
                                    }} onBlur={() => !influencerName ? setNameError(true) : setNameError(false)}></input>
                                    {nameError && <p className="text-red-500 ml-36 -mb-6 pb-2 pl-2">Please enter a name</p>}
                                </div>

                                <div className="flex flex-row gap-10">
                                    <div className="flex flex-row  w-28">
                                        <p className="text-lg font-medium">Instagram</p>
                                        <FaInstagram className="text-2xl fill-pink-500 mt-1 ml-1" />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <div>
                                            <input type="text" className="border-2 border-gray-400 pl-1 pr-1" id="id" name="id" placeholder="id..." autoComplete="off" value={instagramId} onChange={e => {
                                                setInstagramId(e.target.value.trimStart())
                                                setInstagramIdError(false)
                                                if (!e.target.value.trimStart() && instagramFollowersError) {
                                                    setInstagramFollowersError(false)
                                                }
                                            }}></input>
                                            {instagramIdError && <p className="text-red-500 ">Enter Instagram Id.</p>}
                                        </div>
                                        <div>
                                            <input type="number" name="followers" className="border-2 border-gray-400 pl-1 pr-1 w-32" id="followers" placeholder="followers..." autoComplete="off" min="1" value={instagramFollowers} onChange={e => {
                                                setInstagramFollowers(e.target.value.trimStart())
                                                setInstagramFollowersError(false)
                                                if (!e.target.value.trimStart() && instagramIdError) {
                                                    setInstagramIdError(false)
                                                }
                                            }}></input>
                                            {instagramFollowersError && <p className="text-red-500 ">Enter followers</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-10">
                                    <div className="flex flex-row w-28">
                                        <p className="text-lg font-medium ">Twitter</p>
                                        <FaTwitter className="text-2xl fill-blue-600 mt-1 ml-1 fill-blue-500" />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <div>
                                            <input type="text" className="border-2 border-gray-400 pl-1 pr-1" id="id" name="id" placeholder="id..." autoComplete="off" value={twitterId} onChange={e => {
                                                setTwitterId(e.target.value.trimStart())
                                                setTwitterIdError(false)
                                                if (!e.target.value.trimStart() && twitterFollowersError) {
                                                    setTwitterFollowersError(false)
                                                }
                                            }}></input>
                                            {twitterIdError && <p className="text-red-500 ">Enter Twitter Id.</p>}
                                        </div>
                                        <div>
                                            <input type="number" className="border-2 border-gray-400 pl-1 pr-1 w-32" id="followers" name="followers" placeholder="followers..." autoComplete="off" min="1" value={twitterFollowers} onChange={e => {
                                                setTwitterFollowers(e.target.value.trimStart())
                                                setTwitterFollowersError(false)
                                                if (!e.target.value.trimStart() && twitterIdError) {
                                                    setTwitterIdError(false)
                                                }
                                            }}></input>
                                            {twitterFollowersError && <p className="text-red-500 ">Enter Twitter Id.</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-10">
                                    <div className="flex flex-row w-28">
                                        <p className="text-lg font-medium ">YoutTube</p>
                                        <FaYoutube className="text-2xl fill-red-500 mt-1 ml-1 fill-red-500" />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <div>
                                            <input type="text" className="border-2 border-gray-400 pl-1 pr-1" id="id" name="id" placeholder="id..." autoComplete="off" value={youtubeId} onChange={e => {
                                                setYoutubeId(e.target.value.trimStart())
                                                setYoutubeIdError(false)
                                                if (!e.target.value.trimStart() && youtubeFollowersError) {
                                                    setYoutubeFollowersError(false)
                                                }
                                            }}></input>
                                            {youtubeIdError && <p className="text-red-500 ">Enter YouTube Id.</p>}
                                        </div>
                                        <div>
                                            <input type="number" className="border-2 border-gray-400 pl-1 pr-1 w-32" id="followers" name="followers" placeholder="followers..." autoComplete="off" min="1" value={youtubeFollowers} onChange={e => {
                                                setYoutubeFollowers(e.target.value.trimStart())
                                                setYoutubeFollowersError(false)
                                                if (!e.target.value.trimStart() && youtubeIdError) {
                                                    setYoutubeIdError(false)
                                                }
                                            }}></input>
                                            {youtubeFollowersError && <p className="text-red-500 ">Enter YouTube Id.</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-10">
                                    <div className="flex flex-row w-28">
                                        <p className="text-lg font-medium">Facebook</p>
                                        <FaFacebook className="text-2xl fill-blue-400 mt-1 ml-1 fill-blue-400" />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <div>
                                            <input type="text" className="border-2 border-gray-400 pl-1 pr-1" id="id" name="id" placeholder="id..." autoComplete="off" value={facebookId} onChange={e => {
                                                setFacebookId(e.target.value.trimStart())
                                                setFacebookIdError(false)
                                                if (!e.target.value.trimStart() && facebookFollowersError) {
                                                    setFacebookFollowersError(false)
                                                }
                                            }}></input>
                                            {facebookIdError && <p className="text-red-500 ">Enter Facebook Id.</p>}
                                        </div>
                                        <div>
                                            <input type="number" className="border-2 border-gray-400 pl-1 pr-1 w-32" id="followers" name="followers" placeholder="followers..." autoComplete="off" min="1" value={facebookFollowers} onChange={e => {
                                                setFacebookFollowers(e.target.value.trimStart())
                                                setFacebookFollowersError(false)
                                                if (!e.target.value.trimStart() && facebookIdError) {
                                                    setFacebookIdError(false)
                                                }
                                            }}></input>
                                            {facebookFollowersError && <p className="text-red-500 ">Enter Facebook Id.</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className=' mb-2 flex justify-center'>
                                    <button type='submit' className="bg-green-500 text-gray-50 font-medium p-1.5 rounded-lg">Submit</button>
                                </div>

                            </form>


                        </div>
                    </div>
                </div>}
        </Fragment >
    )
}
export default InfluencerForm