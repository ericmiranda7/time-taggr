import Timer from './Timer'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllTags } from '../reducers/tagsReducer'

const Home = () => {
	const tags = useSelector(state => state.tags)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllTags())
	}, [dispatch])

	return (
		<div className="d-flex flex-column align-items-center">
			<h2>{tags.find((tag) => tag.isSelected)?.name}</h2>
			<Timer />
		</div>
	)
}

export default Home