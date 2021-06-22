import Timer from './Timer'
import TagSelect from './settings/TagSelect'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Home = () => {
	const tags = useSelector(state => state.tags)

  useEffect(() => {
    window.localStorage.setItem('tags', JSON.stringify(tags))
  }, [tags])

	return (
		<div className="d-flex flex-column align-items-center mt-0">
			<div style={{fontSize: '1.2em'}} className="mb-2"><TagSelect width="175px" /></div>
			<Timer />
		</div>
	)
}

export default Home