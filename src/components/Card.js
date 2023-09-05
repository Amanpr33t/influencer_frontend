import { Fragment } from "react"
import { FaTrash, FaInstagram, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa"
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { EditActions } from "../store/slices/editSlice";
import useStateReset from "../hooks/useReset";

function Card(props) {
    const { stateReset } = useStateReset()
    const { influencerId, name, socialMedia, loadingSetter, totalFollowers, blurFunction } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteInfluencer = async () => {
        try {
            loadingSetter(true, false)
            const response = await fetch(`https://influencer-backend-3ncd.onrender.com/influencer/delete/${influencerId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Some error occured')
            }
            const data = await response.json()

            if (data.status === 'ok') {
                loadingSetter(true, true)
                stateReset()
                blurFunction(false)
                navigate('/', { replace: true })
            } else {
                throw new Error('Some error occured')
            }
        } catch (error) {
            blurFunction(true)
            loadingSetter(false, false)
        }
    }

    const editInfluencer = () => {
        dispatch(EditActions.setEdit({
            isEdit: true,
            influencerId,
            influencerName: name,
            socialMedia
        }))
        navigate('/form', { replace: true })
    }

    const logoSetter = (website) => {
        if (website === 'instagram') {
            return <div className="flex flex-row">
                <p className="hidden sm:inline font-medium">Instagram</p>
                <FaInstagram className="text-2xl fill-pink-500 mt-0.5 ml-0.5" />
            </div>
        } else if (website === 'twitter') {
            return <div className="flex flex-row">
                <p className="hidden sm:inline font-medium">Twitter</p>
                <FaTwitter className="text-2xl fill-blue-600 mt-0.5 ml-0.5" />
            </div>
        } else if (website === 'facebook') {
            return <div className="flex flex-row">
                <p className="hidden sm:inline font-medium">Facebook</p>
                <FaFacebook className="text-2xl fill-blue-300 mt-0.5 ml-0.5" />
            </div>
        } else if (website === 'youtube') {
            return <div className="flex flex-row">
                <p className="hidden sm:inline font-medium">YouTube</p>
                <FaYoutube className="text-2xl fill-red-500 mt-0.5 ml-0.5" />
            </div>
        }
    }
    return (
        <Fragment>
            <div className=" w-full  mt-12 flex flex-col place-items-center">
                <div className='bg-blue-500 rounded-t-lg p-1 pl-2 pr-2'>
                    <p className="text-xl font-bold text-white">{name}</p>
                </div>
                <table className="table-auto w-full sm:w-11/12 md:w-4/5 lg:w-3/5 xl:w-1/2 bg-gray-100" >
                    <thead className="bg-gray-300">
                        <tr>
                            <th className="border-solid border-2 border-gray-500 w-16 pr-0.5 pl-0.5 sm:w-40">Website</th>
                            <th className="border-solid border-2 border-gray-500">Handle</th>
                            <th className="border-solid border-2 border-gray-500 whitespace-normal w-20 sm:w-24">Followers (millions)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {socialMedia && socialMedia.map(social => {
                            return <tr key={Math.random()} className="h-12">
                                <td className="border-solid border-2 border-gray-500  whitespace-nowrap pl-4 sm:pl-8">{logoSetter(social.website)}</td>
                                <td className="border-solid border-2 border-gray-500 pl-2 pr-1 sm:pl-6 ">{social.handle}  </td>
                                <td className="border-solid border-2 border-gray-500 pl-3 sm:pl-5">{(+social.followers / 1000000).toFixed(2)}</td>
                            </tr>
                        })}
                        <tr className="h-12">
                            <td className="border-solid border-l-2 border-b-2 border-gray-500 "></td>
                            <td className="border-solid border-b-2 border-gray-500  font-medium pl-2 pr-1 sm:pl-6">Total Followers</td>
                            <td className="border-solid border-2 border-gray-500 pl-3 sm:pl-5 font-medium">{(+totalFollowers / 1000000).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <div className='flex gap-12 bg-gray-200 rounded-b-lg p-2'>
                    <button><FaTrash className="fill-red-500 text-xl" onClick={deleteInfluencer} /></button>
                    <button><AiFillEdit className="fill-blue-900 text-xl hover:pointer" onClick={editInfluencer} /></button>
                </div>
            </div>

        </Fragment >
    )
}
export default Card