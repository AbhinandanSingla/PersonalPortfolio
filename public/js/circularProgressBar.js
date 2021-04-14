function radialProgress(selector, text, transitionDuration) {
    const parent = d3.select(selector)
    const svgContainer = parent.append('div').attr('class', 'svgContainer')
    const svgDiv = svgContainer.append('div').attr('class', 'svgDiv')
    const size = svgDiv.node().getBoundingClientRect()
    svgDiv.append('div').attr('class', 'svg-label').text(text)
    const svg = svgDiv.append('svg')
        .attr('width', size.width)
        .attr('height', size.height);
    const outerRadius = Math.min(size.width, size.height) * 0.45;
    const thickness = 10;
    let value = 0;

    const mainArc = d3.arc()
        .startAngle(0)
        .endAngle(Math.PI * 2)
        .innerRadius(outerRadius - thickness)
        .outerRadius(outerRadius)

    svg.append("path")
        .attr('class', 'progress-bar-bg')
        .attr('transform', `translate(${size.width / 2},${size.height / 2})`)
        .attr('d', mainArc())

    const mainArcPath = svg.append("path")
        .attr('class', 'progress-bar')
        .attr('transform', `translate(${size.width / 2},${size.height / 2})`)

    svg.append("circle")
        .attr('class', 'progress-bar')
        .attr('transform', `translate(${size.width / 2},${size.height / 2 - outerRadius + thickness / 2})`)
        .attr('width', thickness)
        .attr('height', thickness)
        .attr('r', thickness / 2)

    const end = svg.append("circle")
        .attr('class', 'progress-bar')
        .attr('transform', `translate(${size.width / 2},${size.height / 2 - outerRadius + thickness / 2})`)
        .attr('width', thickness)
        .attr('height', thickness)
        .attr('r', thickness / 2)

    let percentLabel = svg.append("text")
        .attr('class', 'progress-label')
        .attr('transform', `translate(${size.width / 2},${size.height / 2})`)
        .text('0')

    svg.append("text")
        .attr('class', 'circularText')
        .attr('transform', `translate(${size.width / 2 + 25},${size.height / 2 + 2})`)
        .text('%')

    return {
        update: function (progressPercent) {
            const startValue = value
            const startAngle = Math.PI * startValue / 50
            const angleDiff = Math.PI * progressPercent / 50 - startAngle;
            const startAngleDeg = startAngle / Math.PI * 180
            const angleDiffDeg = angleDiff / Math.PI * 180

            mainArcPath.transition().duration(transitionDuration).attrTween('d', function () {
                return function (t) {
                    mainArc.endAngle(startAngle + angleDiff * t)
                    return mainArc();
                }
            })
            end.transition().duration(transitionDuration).attrTween('transform', function () {
                return function (t) {
                    return `translate(${size.width / 2},${size.height / 2})` +
                        `rotate(${(startAngleDeg + angleDiffDeg * t)})` +
                        `translate(0,-${outerRadius - thickness / 2})`
                }
            })
            percentLabel.transition().duration(transitionDuration).tween('bla', function () {
                return function (t) {
                    percentLabel.text(Math.round(startValue + (progressPercent - startValue) * t));
                }
            })
            value = progressPercent
        }
    }
}

let progressData = [{
    name: 'html',
    data: 80
}, {
    name: 'css',
    data: 40
}, {
    name: 'html',
    data: 30
}, {
    name: 'css',
    data: 70
}, {
    name: 'html',
    data: 20
}, {
    name: 'css',
    data: 80
},];
const skills = `http://${window.location.host}/api/skills`;
$.get(skills, (data, status) => {
    for (let i of data) {
        let chart = radialProgress('.circularProgressBar', i['name'], 1000);
        chart.update(i['progress'])
    }
})