import Timer from './timer/Timer'
import TagSelect from './settings/TagSelect'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import party from "party-js"
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = () => {
	const tags = useSelector(state => state.tags)
	const timer = useSelector(state => state.timer)
	const user = useSelector(state => state.user)

	const selectedTag = tags.find(tag => tag.isSelected)

	const [visible, setVisible] = useState(true)

	useEffect(() => {
		window.localStorage.setItem('tags', JSON.stringify(tags))
	}, [tags])

	useEffect(() => {
		if (timer.expired && selectedTag.value !== 'break') {
			party.confetti(document.getElementById('tagName'), { count: party.variation.range(100, 200) })
		}
	})

	return (
		<div className="d-flex flex-column align-items-center mt-0">
			<Alert variant="info" style={visible ? null : {display: 'none'}}>
				Hey ! Please consider{' '}
				<Link className="alert-link" to="/login">logging in</Link>
				{' '} to save your data
				<span onClick={() => setVisible(false)} style={{ cursor: 'pointer', position: 'relative', bottom: '10px', left: '5px'}}>x</span>
			</Alert>
			<div style={{ fontSize: '1.2em' }} className="mb-2" id="tagName"><TagSelect width="175px" /></div>
			<Timer />
		</div>
	)
}

export default Home