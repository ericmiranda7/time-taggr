import Timer from './Timer'
import TagSelect from './settings/TagSelect'

const Home = ({ tags }) => {
	
	return (
		<div className="d-flex flex-column align-items-center mt-0">
			<h2><TagSelect width="175px" /></h2>
			<Timer />
		</div>
	)
}

export default Home