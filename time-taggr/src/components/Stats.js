import { Card, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Stats = () => {
	const tags = useSelector(state => state.tags)

	const totalTime = tags.reduce((prev, curr) => prev + curr.completedTime, 0)

	return (
		<Card style={{ width: '18rem' }}>
			<Card.Header>Time Spent On</Card.Header>
			<ListGroup variant="flush">
				{
					tags.sort((a, b) => parseInt(b.completedTime) - parseInt(a.completedTime)).map(tag => {
						return (
							<ListGroup.Item key={tag.value}>
								<div className="d-flex flex-row">
									<span className="d-inline-flex flex-grow-1 centered-text-span" >{tag.name}</span>
									<span>{tag.completedTime / 3600 | 0}H {(tag.completedTime / 60 | 0) % 60}M</span>
								</div>
							</ListGroup.Item>
						)
					})
				}

				<ListGroup.Item > 
					<div className="d-flex flex-row">
						<span className="d-inline-flex flex-grow-1 centered-text-span" >Total Time</span>
						<span className="">{totalTime / 3600 | 0}H {(totalTime / 60 | 0) % 60}M</span>
					</div>
				</ListGroup.Item>
			</ListGroup>
		</Card>
	)
}

export default Stats