import { useDispatch } from "react-redux"
import { uiOpenModal } from "../../actions/ui";


export const AddButton = () => {

  const dispatch = useDispatch();

  const handleClick = () => {
     dispatch(uiOpenModal());
  }

  return (
    <button
      className="btn btn-primary fab"
      onClick={ handleClick }
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}
