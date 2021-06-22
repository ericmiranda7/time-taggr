import Timer from './Timer'

const Home = ({ tags }) => {
	
	return (
		<div className="d-flex flex-column align-items-center mt-0">
			<h2>{tags.find((tag) => tag.isSelected)?.name}</h2>
			<Timer />
		</div>
	)
}

export default Home