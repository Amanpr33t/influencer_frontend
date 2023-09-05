import { useDispatch } from "react-redux"
import { FormActions } from "../store/slices/formSlice"
import { SortActions } from "../store/slices/sortSlice"
import { SearchActions } from "../store/slices/searchSlice"
import { EditActions } from "../store/slices/editSlice"

const useStateReset = () => {
    const dispatch = useDispatch()
    const stateReset = () => {
        dispatch(FormActions.setForm(false))
        dispatch(SortActions.setSort(null))
        dispatch(SearchActions.setSearch(null))
        dispatch(EditActions.setEdit({
            isEdit: false,
            influencerId: null,
            influencerName: null,
            socialMedia: null
        }))
    }
    return {
        stateReset
    }
}
export default useStateReset