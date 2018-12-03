import React, {PureComponent} from 'react';
import { connect } from 'react-redux';

import { addTimeSeries, deleteTimeSeries } from '../actions';

const mapStateToProps = state => {
    return {
        timeSeries: state.timeSeries
    };
};

const mapDispatchToProps = dispatch => {
    return{
        add: (timestamp, value) => dispatch(addTimeSeries(timestamp, value)),
        delete: timestamp => dispatch(deleteTimeSeries(timestamp))
    }
};

class ConnectedDataEditor extends PureComponent{
    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        const { timeSeries } = this.props;
        return (
            <div className='dataEditor'>
                <strong>Data</strong>
                <input type='text'/>

                List of values
                <ul>
                    { timeSeries.map(elem => <li></li>) }                    
                </ul>
            </div>
        );
    }
}
const DataEditor = connect(mapStateToProps, mapDispatchToProps)(ConnectedDataEditor);
export default DataEditor;