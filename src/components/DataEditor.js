import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { addTimeSeries, deleteTimeSeries } from '../actions';

//ссылаемся на список значений в хранилище
const mapStateToProps = state => {
    return {
        timeSeries: state.timeSeries
    };
};

//привязываем redux actions к компоненту редактора
const mapDispatchToProps = dispatch => {
    return{
        add: (time, value) => dispatch(addTimeSeries(time, value)),
        delete: time => dispatch(deleteTimeSeries(time))
    }
};

class ConnectedDataEditor extends Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = { currentValue: 0 };
        this.addTimeSeries = this.addTimeSeries.bind(this);
        this.deleteTimeSeries = this.deleteTimeSeries.bind(this);
    }

    //добавляем значение с текущим временем
    addTimeSeries(e){
        e.preventDefault();
        
        if(this.state.currentValue.length > 0)
            this.props.add(new Date(), Number.parseInt(this.state.currentValue, 10));

        e.target.reset();
    }

    //вызов функции для удаления значения по времени
    deleteTimeSeries(time){
        this.props.delete(time);
    }

    render(){
        const { timeSeries } = this.props;
        return (
            <div className='dataEditor'>
                <form onSubmit={this.addTimeSeries} className='addTimeSeriesForm'>
                    <label>
                        <strong>Data</strong>
                    </label>                    
                    <input type='number' className='numberInput' onChange={e => this.setState({ currentValue: e.target.value })}/>
                </form>

                List of values
                <ul className='valueList'>
                    { timeSeries.map((elem, i) => (
                        <li key={i} className='valueItem'>
                            <span className='timeLabel'>
                                { moment(elem.time).format('mm:ss:SSS') }
                            </span>
                            <strong className='valueLabel'>
                                { elem.value }
                            </strong>
                            <button onClick={e => this.deleteTimeSeries(elem.time)} className='removeButton'>
                                Remove
                            </button>
                        </li>
                    )) }                    
                </ul>
            </div>
        );
    }
}
const DataEditor = connect(mapStateToProps, mapDispatchToProps)(ConnectedDataEditor);
export default DataEditor;