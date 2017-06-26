class TimerDashboard extends React.Component {
    render () {
        return (
            <div className="ui three column centered grid">
                <div className="column">
                    <EditableTimerList />
                    <ToggableTimerForm isOpen={true} />
                </div>
            </div>
        )
    }
}
