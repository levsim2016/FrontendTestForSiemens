import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { line, select, scaleLinear } from 'd3';
import { minBy, maxBy } from 'lodash/math';
import moment from 'moment';
import Dimensions from 'react-dimensions';

const mapStateToProps = state => {
    return {
        timeSeries: state.timeSeries
    };
};

class ConnectedGraphCanvas extends PureComponent{
    constructor(props){
        super(props);
        this.props = props;
        this.node = null;
        //this.initGraph = this.initGraph.bind(this);
        this.updateGraph = this.updateGraph.bind(this);

        window.addEventListener('resize', this.updateGraph)
    }

    componentDidMount(){
        this.updateGraph();
    }

    componentDidUpdate(){
        this.updateGraph();
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateGraph);
    }

    updateGraph(){
        const { timeSeries } = this.props;
        const { node } = this;
        const size = timeSeries.length;
        const svgWidth = this.props.containerWidth;
        const svgHeight = this.props.containerHeight;
        
        select(node).selectAll('path').remove();

        if(size > 0){
            const minValue = minBy(timeSeries, 'value').value;
            const maxValue = maxBy(timeSeries, 'value').value;
            const start = moment(timeSeries[0].time).unix();
            const end = moment(timeSeries[size - 1].time).add(1, 'm').unix();
            //const seconds = [ 0, end - start ];
            const x = scaleLinear()
                .domain([ 1, end - start ])
                .range([20, svgWidth]);

            const y = scaleLinear()
                .domain([ minValue, maxValue ])
                .rangeRound([svgHeight - 10, 10]);
            const lineObj = line()
                .x(data => {
                    return x(moment(data.time).unix() - start);
                })
                .y(data => y(data.value));

            select(node)
                .datum(timeSeries)
                .append('path')
                .attr('d', lineObj)
                .attr('stroke-width', 3)
                .attr("stroke", "steelblue")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr('fill', 'none');    
        }
    }

    render(){
        return (
            <svg ref={ node => this.node = node}/>   
        );
    }
}

const dimensionOptions = {
    containerStyle: null,
    className: 'graphCanvas'
}
const GraphCanvas = connect(mapStateToProps)(Dimensions(dimensionOptions)(ConnectedGraphCanvas)); 
export default GraphCanvas;