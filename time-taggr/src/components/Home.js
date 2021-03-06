import Timer from './timer/Timer'
import TagSelect from './settings/TagSelect'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import party from "party-js"
import { Link } from 'react-router-dom'
import Notification from './Notification'

const Home = () => {
	const tags = useSelector(state => state.tags)
	const timer = useSelector(state => state.timer)
	const user = useSelector(state => state.user?.username)

	const selectedTag = tags.find(tag => tag.isSelected)

	useEffect(() => {
		if (timer.expired && selectedTag.value !== 'break') {
			party.confetti(document.getElementById('tagName'), { count: party.variation.range(100, 200) })
		}
	})

	return (
		<div className="d-flex flex-column align-items-center mt-0">
			{user ? null :
				<Notification type="info">
					Hey ! Consider{' '}
					<Link className="alert-link" to="/login">logging in</Link>
					{' '} to save your data
				</Notification>
			}
			<div style={{ fontSize: '1.2em' }} className="mb-2" id="tagName"><TagSelect width="175px" /></div>
			<Timer />
		</div>
	)
}

export default Home