import React, {PureComponent} from 'react';
import GraphCanvas from './GraphCanvas';
import DataEditor from './DataEditor';

export default class Graph extends PureComponent{
    render(){
        return (
            <div className='graph'>
                <GraphCanvas/>
                <DataEditor/>
            </div>
        );
    }
}