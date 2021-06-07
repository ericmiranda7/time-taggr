const Clock = ({ timer }) => {
  const styles = {
    clock: {
      height: '350px',
      width: '350px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderStyle: 'solid',
      borderWidth: '0.5em'
    },
    'time-text': {
      fontSize: '50px'
    }
  }

  return (
    <div className="mx-auto rounded-circle" style={styles.clock}>
      <p className="mb-0" style={styles['time-text']}>{timer.minutes}:{timer.seconds}</p>
    </div>
  )

}

export default Clock