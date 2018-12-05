import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { minBy, maxBy } from 'lodash/math';
import moment from 'moment';
import Dimensions from 'react-dimensions'; //для получения размера элемента до его рендера

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
        
        //очищаем svg элемент
        select(node).selectAll('path').remove();
        select(node).selectAll('text').remove();

        //если есть значения, то отрисовывем график
        if(size > 0){
            //минимальные и максимальные значения, нужны для нормализации координат по оси значений(Y)
            const minValue = minBy(timeSeries, 'value').value;
            const maxValue = maxBy(timeSeries, 'value').value;
            const absMax = Math.max(Math.abs(minValue), maxValue);

            //от времени добавления первого значения до времени последнего + 1 минута
            const start = moment(timeSeries[0].time).unix();
            const end = moment(timeSeries[size - 1].time).add(1, 'm').unix();

            //координата точки по оси времени добавления в пределах высоты svg элемента
            const x = scaleLinear()
                .domain([ 1, end - start ])
                .range([20, svgWidth - 20]);

            //координата точки по оси значений в пределах высоты svg элемента
            const y = scaleLinear()
                .domain([ -absMax, absMax ])
                .rangeRound([svgHeight - 20, 20]);

            //линия
            const lineObj = line()
                .x(data => x(moment(data.time).unix() - start))
                .y(data => y(data.value));            

            //отрисовка линии внутри svg "холста"
            select(node)
                .datum(timeSeries)
                .append('path')
                .attr('d', lineObj)
                .attr('stroke-width', 3)
                .attr("stroke", "steelblue")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr('fill', 'none');  
            
            //добавление меток значений в координатах точек линии
            //добавляем после отрисовки линии для того, чтобы метки были над линией
            timeSeries.map(elem => {
                select(node)
                .append('text')
                .attr('x', x(moment(elem.time).unix() - start))
                .attr('y', y(elem.value))
                .attr('text-anchor', 'start')
                .text(elem.value);
            });
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

//"привязка" компонента графика к состоянию приложения
const GraphCanvas = connect(mapStateToProps)(Dimensions(dimensionOptions)(ConnectedGraphCanvas)); 
export default GraphCanvas;