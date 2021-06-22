import Timer from './Timer'
import TagSelect from './settings/TagSelect'

const Home = ({ tags }) => {
	
	return (
		<div className="d-flex flex-column align-items-center mt-0">
			<div style={{fontSize: '1.2em'}} className="mb-2"><TagSelect width="175px" /></div>
			<Timer />
		</div>
	)
}

export default Home