import Timer from './timer/Timer'
import TagSelect from './settings/TagSelect'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import party from "party-js"

const Home = () => {
	const tags = useSelector(state => state.tags)
	const timer = useSelector(state => state.timer)

	const selectedTag = tags.find(tag => tag.isSelected)

	useEffect(() => {
		window.localStorage.setItem('tags', JSON.stringify(tags))
	}, [tags])

	useEffect(() => {
		if (timer.expired && selectedTag.value !== 'break') {
			console.log('done')
			party.confetti(document.getElementById('tagName'), { count: party.variation.range(100, 200) })
		}
	})

	return (
		<div className="d-flex flex-column align-items-center mt-0">
			<div style={{ fontSize: '1.2em' }} className="mb-2" id="tagName"><TagSelect width="175px" /></div>
			<Timer />
		</div>
	)
}

export default Home